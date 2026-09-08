import { Image, StyleSheet, Text, View } from 'react-native';

type BookCardProps = {
  title: string;
  author: string;
  price: string;
  image: string;
};

export default function BookCard({
  title,
  author,
  price,
  image,
}: BookCardProps) {
  return (
    <View style={styles.card}>
      {/* Ảnh bìa */}
      <Image
        source={{ uri: image }}
        style={styles.cover}
      />

      {/* Thông tin sách */}
      <View style={styles.info}>
        <View>
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {title}
          </Text>

          <Text style={styles.author}>
            {author}
          </Text>
        </View>

        {/* Giá nằm dưới cùng */}
        <Text style={styles.price}>
          {price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    backgroundColor: '#FFFFFF',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,

    borderRadius: 10,

    // Android
    elevation: 3,
  },

  cover: {
    width: 80,
    height: 110,
    borderRadius: 6,
  },

  info: {
    flex: 1,
    height: 110,

    marginLeft: 12,

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2A5A',
    lineHeight: 22,
  },

  author: {
    marginTop: 6,
    fontSize: 14,
    color: '#666666',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D35400',
  },
});