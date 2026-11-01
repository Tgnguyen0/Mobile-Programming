import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../slices/cartAdvancedSlice';
import {
  selectAdvItems,
  selectAdvTotal,
  selectAdvItemCount,
} from '../slices/cartAdvancedSelectors';
import { s } from './styles';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 80 },
];

export default function Level2() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAdvItems);
  const total = useAppSelector(selectAdvTotal);
  const count = useAppSelector(selectAdvItemCount);

  return (
    <ScrollView contentContainerStyle={s.screen}>
      <Text style={s.h1}>🛒 Giỏ Hàng Nâng Cao</Text>

      <Text style={s.h2}>Danh Sách Sản Phẩm</Text>
      <View style={s.wrap}>
        {PRODUCTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={s.btn}
            onPress={() => dispatch(addToCart(p))}
          >
            <Text style={s.btnText}>
              {p.name} (${p.price})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.h2}>Giỏ Hàng ({count} sản phẩm)</Text>
      {items.length === 0 ? (
        <Text style={s.muted}>Giỏ hàng trống</Text>
      ) : (
        <>
          {items.map((item) => (
            <View key={item.id} style={s.card}>
              <View style={s.row}>
                <Text style={{ fontWeight: '600' }}>
                  {item.name} x {item.quantity}
                </Text>
                <Text>${item.price * item.quantity}</Text>
              </View>
              <View style={s.wrap}>
                <TouchableOpacity
                  style={s.btnGhost}
                  onPress={() => dispatch(decreaseQuantity(item.id))}
                >
                  <Text style={s.btnGhostText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.btnGhost}
                  onPress={() => dispatch(increaseQuantity(item.id))}
                >
                  <Text style={s.btnGhostText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.btnDanger}
                  onPress={() => dispatch(removeFromCart(item.id))}
                >
                  <Text style={s.btnText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={[s.total, { marginTop: 8 }]}>
            Tổng Cộng: ${total.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={[s.btnGhost, { marginTop: 12 }]}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={s.btnGhostText}>Xóa Tất Cả</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
