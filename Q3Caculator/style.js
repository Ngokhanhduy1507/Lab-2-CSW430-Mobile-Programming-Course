import { StyleSheet, Platform, StatusBar } from 'react-native';

const GAP = 12;
const BTN = 62;

const COLORS = {
  bg: '#F3F3F3',            // nền sáng
  card: '#FFFFFF',          // nền nút trắng
  text: '#2C2C2C',          // chữ số
  sub: '#6B6B6B',
  orange: '#FFA000',        // cam (operator & =)
  orangeDark: '#FF8F00',    // cam đậm hơn chút
  bar: '#E7E7E7',           // thanh C
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  display: {
    flex: 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  displayText: {
    fontSize: 56,
    color: COLORS.text,
    fontWeight: '700',
  },

  keypad: {
    flex: 3.8,
    paddingHorizontal: 18,
    paddingBottom: 16,
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
    justifyContent: 'center',
  },

  // nút tròn trắng
  btn: {
    width: BTN,
    height: BTN,
    borderRadius: BTN / 2,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  // nút 0 dài
  btnWide: {
    width: BTN * 2 + GAP,
    height: BTN,
    borderRadius: BTN / 2,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  // biến thể
  btnEqual: {
    backgroundColor: COLORS.orange,
  },
  btnClear: {
    backgroundColor: 'transparent',
  },

  // text
  btnText: {
    fontSize: 22,
    color: COLORS.text,
    fontWeight: '700',
  },
  btnTextOperator: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.orange,   // operator cam trên nền trắng
  },
  btnTextEqual: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',       // = trắng trên nền cam
  },

  // thanh C ở đáy
  bottomBar: {
    marginTop: 6,
    backgroundColor: COLORS.bar,
    height: BTN,
    borderRadius: BTN / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
