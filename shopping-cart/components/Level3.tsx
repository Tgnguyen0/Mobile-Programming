import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts } from '../slices/productsSlice';
import {
  hydrateCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} from '../slices/cartSlice';
import {
  selectCartItems,
  selectSubtotal,
  selectDiscount,
  selectTax,
  selectCartTotal,
  selectItemCount,
} from '../slices/cartSelectors';
import { s } from './styles';

const SHIPPING = [
  { label: 'Miễn phí', cost: 0 },
  { label: 'Tiêu chuẩn ($10)', cost: 10 },
  { label: 'Nhanh ($25)', cost: 25 },
];

const CODES = [
  { code: 'SUMMER10', label: 'SUMMER10 (-10%)' },
  { code: 'SPECIAL20', label: 'SPECIAL20 (-20%)' },
];

export default function Level3() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((st) => st.products.items);
  const status = useAppSelector((st) => st.products.status);
  const error = useAppSelector((st) => st.products.error);
  const items = useAppSelector(selectCartItems);
  const { discountCode, shippingCost, taxRate } = useAppSelector((st) => st.cart);
  const itemCount = useAppSelector(selectItemCount);
  const subtotal = useAppSelector(selectSubtotal);
  const discount = useAppSelector(selectDiscount);
  const tax = useAppSelector(selectTax);
  const total = useAppSelector(selectCartTotal);

  useEffect(() => {
    dispatch(hydrateCart());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  return (
    <ScrollView contentContainerStyle={s.screen}>
      <Text style={s.h1}>🛍️ Cửa Hàng Trực Tuyến</Text>

      <Text style={s.h2}>Sản Phẩm Có Sẵn</Text>
      {status === 'loading' && <ActivityIndicator />}
      {status === 'failed' && (
        <View>
          <Text style={{ color: '#dc2626' }}>Lỗi tải dữ liệu: {error}</Text>
          <TouchableOpacity
            style={[s.btn, { marginTop: 8, alignSelf: 'flex-start' }]}
            onPress={() => dispatch(fetchProducts())}
          >
            <Text style={s.btnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}
      {products.map((p) => (
        <View key={p.id} style={[s.card, s.row]}>
          <Image source={{ uri: p.image }} style={s.thumb} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600' }} numberOfLines={1}>
              {p.name}
            </Text>
            <Text>${p.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={s.btn}
            onPress={() =>
              dispatch(addToCart({ id: p.id, name: p.name, price: p.price }))
            }
          >
            <Text style={s.btnText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={s.h2}>Giỏ Hàng ({itemCount} sản phẩm)</Text>
      {items.length === 0 ? (
        <Text style={s.muted}>Giỏ hàng trống</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={s.card}>
            <Text style={{ fontWeight: '600' }} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={s.row}>
              <View style={[s.wrap, { alignItems: 'center' }]}>
                <TouchableOpacity
                  style={s.btnGhost}
                  onPress={() => dispatch(decreaseQuantity(item.id))}
                >
                  <Text style={s.btnGhostText}>-</Text>
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity
                  style={s.btnGhost}
                  onPress={() => dispatch(increaseQuantity(item.id))}
                >
                  <Text style={s.btnGhostText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity
                style={s.btnDanger}
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                <Text style={s.btnText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Text style={s.h2}>Mã Giảm Giá</Text>
      <View style={s.wrap}>
        {CODES.map((c) => {
          const active = discountCode === c.code;
          return (
            <TouchableOpacity
              key={c.code}
              style={active ? s.btn : s.btnGhost}
              // Bấm lại để bỏ mã
              onPress={() => dispatch(applyDiscount(active ? null : c.code))}
            >
              <Text style={active ? s.btnText : s.btnGhostText}>{c.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={s.h2}>Phí Vận Chuyển</Text>
      <View style={s.wrap}>
        {SHIPPING.map((o) => (
          <TouchableOpacity
            key={o.cost}
            style={shippingCost === o.cost ? s.btn : s.btnGhost}
            onPress={() => dispatch(setShippingCost(o.cost))}
          >
            <Text style={shippingCost === o.cost ? s.btnText : s.btnGhostText}>
              {o.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.h2}>Tóm Tắt Đơn Hàng</Text>
      <View style={s.card}>
        <View style={s.row}>
          <Text>Tạm tính:</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </View>
        {discount > 0 && (
          <View style={s.row}>
            <Text>Giảm giá:</Text>
            <Text>-${discount.toFixed(2)}</Text>
          </View>
        )}
        <View style={s.row}>
          <Text>Thuế ({Math.round(taxRate * 100)}%):</Text>
          <Text>${tax.toFixed(2)}</Text>
        </View>
        <View style={s.row}>
          <Text>Vận chuyển:</Text>
          <Text>${(items.length ? shippingCost : 0).toFixed(2)}</Text>
        </View>
        <View style={s.row}>
          <Text style={s.total}>Thành Tiền:</Text>
          <Text style={s.total}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[s.wrap, { marginTop: 8 }]}>
        <TouchableOpacity style={s.btn}>
          <Text style={s.btnText}>Thanh Toán</Text>
        </TouchableOpacity>
        {items.length > 0 && (
          <TouchableOpacity
            style={s.btnGhost}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={s.btnGhostText}>Xóa Tất Cả</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
