import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart, removeFromCart, clearCart } from '../slices/cartBasicSlice';
import { s } from './styles';

export default function Level1() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((st) => st.cartBasic.items);

  return (
    <ScrollView contentContainerStyle={s.screen}>
      <Text style={s.h1}>Giỏ Hàng Cơ Bản</Text>

      <TouchableOpacity
        style={s.btn}
        onPress={() =>
          // Level 1 dùng id theo thời gian để mỗi lần bấm là một dòng mới
          dispatch(addToCart({ id: Date.now(), name: 'Laptop', price: 1000 }))
        }
      >
        <Text style={s.btnText}>Thêm Laptop</Text>
      </TouchableOpacity>

      <Text style={s.h2}>Sản phẩm trong giỏ ({items.length})</Text>
      {items.length === 0 && <Text style={s.muted}>Giỏ hàng trống</Text>}
      {items.map((item) => (
        <View key={item.id} style={s.row}>
          <Text>
            {item.name} - ${item.price}
          </Text>
          <TouchableOpacity
            style={s.btnDanger}
            onPress={() => dispatch(removeFromCart(item.id))}
          >
            <Text style={s.btnText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      ))}

      {items.length > 0 && (
        <TouchableOpacity
          style={[s.btnGhost, { marginTop: 12 }]}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={s.btnGhostText}>Xóa Tất Cả</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
