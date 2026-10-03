# Ôn tập Component trong React Native

> Họ và tên: Vũ Hữu Cao
> Mã sinh viên: 10123038
> Lớp: 12523w.1

Project sử dụng Expo SDK 57 và React Native để hoàn thành 5 câu hỏi lý thuyết cùng 3 bài thực hành về component, props và Hooks.

## A. Câu hỏi ôn tập lý thuyết

### Câu 1. Component trong React Native là gì?

Component là một đơn vị độc lập dùng để mô tả một phần của giao diện và hành vi liên quan đến phần giao diện đó. Một component có thể nhận dữ liệu đầu vào thông qua `props`, tự quản lý dữ liệu thay đổi bằng `state`, xử lý sự kiện và trả về cây phần tử React Native như `View`, `Text`, `Image` hoặc `Pressable`.

Có thể xem component là “khối xây dựng” của giao diện vì một màn hình lớn được ghép từ nhiều phần nhỏ. Ví dụ, màn hình danh sách sinh viên có thể gồm `Header`, nhiều `StudentInfo` và `Footer`. Mỗi phần đảm nhiệm một nhiệm vụ riêng, sau đó được lắp ghép để tạo thành ứng dụng hoàn chỉnh. Cách tổ chức này giúp giao diện dễ hiểu, dễ phát triển và dễ thay đổi hơn so với việc viết toàn bộ màn hình trong một khối mã duy nhất.

### Câu 2. Tính độc lập, tái sử dụng và đóng gói của component

- **Tính độc lập:** Mỗi component tập trung vào một chức năng hoặc một phần giao diện. Ví dụ, `StudentInfo` chỉ chịu trách nhiệm hiển thị thông tin của một sinh viên. Khi một phần gặp lỗi hoặc cần thay đổi, lập trình viên có thể xử lý ngay tại component đó mà ít ảnh hưởng đến phần khác.
- **Tính tái sử dụng:** Cùng một component có thể xuất hiện nhiều lần với dữ liệu khác nhau. `Greeting` có thể chào nhiều người bằng cách truyền các giá trị `name` khác nhau; `StudentInfo` có thể hiển thị cả danh sách chỉ bằng cách lặp qua mảng dữ liệu. Điều này giảm mã trùng lặp và giữ giao diện nhất quán.
- **Tính đóng gói:** Cấu trúc giao diện, xử lý sự kiện và style liên quan được đặt gần nhau trong component. Component cha chỉ cần biết cách sử dụng component con qua giao diện công khai là props, không cần biết toàn bộ chi tiết bên trong.

Trong quá trình phát triển, ba đặc điểm trên giúp chia ứng dụng thành các phần nhỏ, phân công công việc thuận lợi và kiểm thử dễ hơn. Khi bảo trì, một thay đổi chung chỉ cần thực hiện ở component dùng lại thay vì sửa ở mọi màn hình. Tên component và kiểu dữ liệu props rõ ràng cũng làm mã nguồn dễ đọc, giảm lỗi truyền sai dữ liệu.

### Câu 3. Functional Component và Class Component

| Tiêu chí | Functional Component | Class Component |
| --- | --- | --- |
| Cách khai báo | Hàm JavaScript/TypeScript trả về JSX | Lớp kế thừa `React.Component` và có phương thức `render()` |
| Props | Nhận trực tiếp qua tham số hàm | Truy cập bằng `this.props` |
| State | Dùng Hooks như `useState` | Dùng `this.state` và `this.setState()` |
| Vòng đời | Dùng `useEffect` và các Hooks liên quan | Dùng `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` |
| Ngữ cảnh `this` | Không sử dụng `this` | Phải xử lý `this`, đôi khi phải bind hàm |
| Mức độ ngắn gọn | Thường ngắn và dễ tách logic | Nhiều mã khuôn mẫu hơn |

Functional Component hiện được ưu tiên vì cú pháp gọn, không có vấn đề ràng buộc `this` và có thể dùng Hooks để quản lý state, side effect, context hoặc tái sử dụng logic. Custom Hook còn cho phép chia sẻ logic có trạng thái giữa nhiều component mà không cần các mô hình phức tạp như higher-order component hoặc render props. Class Component vẫn có thể gặp trong dự án cũ, nhưng với mã mới, Functional Component kết hợp Hooks thường dễ đọc và dễ bảo trì hơn.

### Câu 4. Vai trò của `useState`

`useState` là Hook giúp Functional Component lưu và cập nhật state. Lệnh:

```jsx
const [count, setCount] = useState(0);
```

tạo biến state `count` với giá trị ban đầu là `0` và hàm `setCount` để cập nhật giá trị. Khi gọi `setCount`, React ghi nhận state mới và render lại component, nhờ đó phần giao diện sử dụng `count` được cập nhật.

Nếu chỉ dùng biến thông thường như `let count = 0`, việc tăng biến không thông báo cho React render lại giao diện. Ngoài ra, biến cục bộ được tạo lại trong mỗi lần render nên không phải nơi phù hợp để lưu dữ liệu thay đổi theo tương tác. State cần dùng cho các dữ liệu ảnh hưởng đến giao diện và thay đổi theo thời gian, chẳng hạn số lần bấm, nội dung ô nhập, trạng thái bật/tắt hoặc dữ liệu đang được chọn.

Khi giá trị mới phụ thuộc vào giá trị trước đó, nên dùng dạng cập nhật hàm:

```jsx
setCount((currentCount) => currentCount + 1);
```

Cách này bảo đảm phép cập nhật sử dụng state mới nhất ngay cả khi React gộp nhiều lần cập nhật.

### Câu 5. Chức năng của `useEffect`

`useEffect` dùng để đồng bộ component với một hệ thống hoặc tác vụ nằm ngoài quá trình render, thường gọi là side effect. Callback của effect chạy sau khi React cập nhật giao diện. Mảng dependency quyết định thời điểm effect chạy:

```jsx
useEffect(() => {
  console.log('Chạy sau mỗi lần render');
});

useEffect(() => {
  console.log('Chạy một lần sau lần render đầu tiên');
}, []);

useEffect(() => {
  console.log('Chạy khi userId thay đổi');
}, [userId]);
```

Một số tình huống sử dụng thực tế:

- Gọi API khi màn hình được mở hoặc khi tham số tìm kiếm thay đổi.
- Đăng ký và hủy đăng ký event listener.
- Khởi tạo hoặc dừng timer.
- Đồng bộ tiêu đề, bộ nhớ cục bộ hoặc dịch vụ bên ngoài với state.
- Ghi log hoặc gửi dữ liệu phân tích khi một giá trị quan trọng thay đổi.

Effect có thể trả về một hàm cleanup. Hàm này chạy trước khi effect thực hiện lại và khi component bị gỡ khỏi giao diện, giúp tránh rò rỉ tài nguyên:

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log('Đang chạy...');
  }, 1000);

  return () => clearInterval(timerId);
}, []);
```

Không nên dùng `useEffect` cho phép tính thuần túy có thể thực hiện ngay trong lúc render. Effect chỉ cần thiết khi phải đồng bộ với thứ gì đó bên ngoài React hoặc thực hiện tác vụ phụ.

## B. Bài tập luyện tập thực hành

### Bài 1 – Greeting

File [`src/components/Greeting.tsx`](src/components/Greeting.tsx) khai báo Functional Component nhận prop `name`. Trong [`App.js`](App.js), component được sử dụng hai lần với hai họ tên khác nhau:

```jsx
<Greeting name="Nguyễn Văn An" />
<Greeting name="Trần Thu Hà" />
```

### Bài 2 – StudentInfo

File [`src/components/StudentInfo.tsx`](src/components/StudentInfo.tsx) nhận ba props: `fullName`, `className` và `major`. Dữ liệu nhiều sinh viên được đặt trong [`src/data/students.ts`](src/data/students.ts), sau đó component cha dùng `map` để tạo nhiều `StudentInfo`. Cách làm này thể hiện rõ khả năng tái sử dụng component và truyền dữ liệu từ cha xuống con.

### Bài 3 – CounterHook

File [`src/components/CounterHook.tsx`](src/components/CounterHook.tsx) dùng `useState(0)` để quản lý số lần bấm. Nút **Tăng +1** cập nhật state bằng dạng callback; sau mỗi lần cập nhật, React render lại số đếm trên giao diện. Project bổ sung nút **Đặt lại** để đưa bộ đếm về 0.

## Cấu trúc chính

```text
react-native-components-assignment/
├── App.js
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── CounterHook.tsx
│   │   ├── Greeting.tsx
│   │   ├── SectionCard.tsx
│   │   └── StudentInfo.tsx
│   └── data/
│       └── students.ts
├── app.json
├── package.json
└── tsconfig.json
```

## Cách chạy project

Yêu cầu: Node.js 22.13 trở lên và ứng dụng Expo Go hỗ trợ SDK 57.

```bash
npm install
npm start
```

Sau khi Metro chạy, quét mã QR bằng Expo Go. Có thể chạy các nền tảng cụ thể bằng:

```bash
npm run android
npm run ios
npm run web
```

Kiểm tra chất lượng mã nguồn:

```bash
npm run check
```

## Tài liệu tham khảo

- [React Native – Core Components and Native Components](https://reactnative.dev/docs/intro-react-native-components)
- [React – Describing the UI](https://react.dev/learn/describing-the-ui)
- [React – useState](https://react.dev/reference/react/useState)
- [React – useEffect](https://react.dev/reference/react/useEffect)
- [Expo – Create a project](https://docs.expo.dev/get-started/create-a-project/)

