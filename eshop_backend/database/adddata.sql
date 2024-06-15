
SET SQL_SAFE_UPDATES = 0;

delete from orderDetails;
delete from orders;
delete from comments;
delete from products;
delete from categories;
delete from accounts;

INSERT INTO categories (categoryID, categoryName) VALUES
(40000001, 'laptop'),
(40000002, 'mouse'),
(40000003, 'keyboard');

INSERT INTO products (productID, productName, categoryID, description, price, stock, image_url) VALUES
(3000001, 'Laptop Acer aspire 7', 40000001, 'CPU: Intel® Core™ i5-12450H; RAM: 16GB (8GBx2) DDR4 3200 MHz (Tối đa 32GB); Ổ cứng: 512GB SSD PCIe NVMe (Nâng cấp thay thế,tối đa 1TB)(Còn trống 1 khe); VGA: Intel® UHD Graphics; Màn hình: 15.6" FHD IPS SlimBezel IPS 60Hz Acer ComfyView™; Màu: Đen; Chất liệu: Nhôm (Mặt A),Nhựa; OS: Windows 11.', 15299000, 12,'https://hanoicomputercdn.com/media/product/76816_laptop_acer_aspire_7_a715_76_53pj__nh_qgesv_007___6_.jpg'),
(3000002, 'Laptop Asus vivobook 15', 40000001, 'CPU: Intel® Core™ i7-13700H; RAM: 16GB DDR4 (8GB onboard + 8GB SO-DIMM); Ổ cứng: 512GB M.2 NVMe™ PCIe 4.0 (Nâng cấp thay thế); VGA: Intel® Iris Xe Graphics; Màn hình: 15.6" FHD OLED 16:9, 60Hz, 600nits; Màu sắc: Bạc; OS: Windows 11 Home.', 20349000, 19,'https://hanoicomputercdn.com/media/product/81297_laptop_asus_vivobook_a1505va_l1491w___3_.jpg'),
(3000003, 'Laptop Lenovo IdeaPad 5', 40000001, 'CPU: Intel® Core™ i7-13620H, 10C (6P + 4E); RAM: 16GB ( Hàn liền không nâng cấp được ); Ổ cứng: 512GB SSD M.2 2242 PCIe® 4.0x4 NVMe® (Nâng cấp thay thế); VGA: Integrated Intel® UHD Graphics; Màn hình: 14" WUXGA (1920x1200) OLED 400nits Glossy, 100% DCI-P3, TÜV Low Blue Light, DisplayHDR™ True Black 500; Màu: Xám; Chất liệu: Nhôm; OS: Windows 11 Home.', 20349000, 85,'https://hanoicomputercdn.com/media/product/77617_laptop_lenovo_ideapad_slim_5_14ilr8__82xd007qvn__5.jpg'),
(3000004, 'Laptop Dell Vostro 3430', 40000001, 'CPU: Intel Core i3 1305U; Ram: 8GB DDR4 2666Mhz (Còn trống 1 khe); Ổ cứng: 512GB M.2 PCIe NVMe SSD; VGA:Intel UHD Graphics; Màn hình: 14.0-inch FHD (1920 x 1080) Anti-Glare LED Backlight Non-Touch Narrow Border WVA Display; Màu: Xám; OS: Windows 11 Home/Office Home & Student 2021.', 12499000, 20,'https://hanoicomputercdn.com/media/product/76261_laptop_dell_vostro_3430__71015716_.jpg'),
(3000005, 'Laptop Apple Macbook air', 40000001, 'CPU: APPLE M2 8C CPU; GPU:10C GPU; RAM: 16GB RAM; Ổ cứng: 256GB SSD; Màn hình: 13.6 inch; OS: MAC OS; Màu sắc: xám', 30299000, 45, 'https://hanoicomputercdn.com/media/product/82681_laptop_apple_macbook_air__z15s006j7_.jpg'),
(3000006, 'Laptop LG Gram 14', 40000001, 'CPU: Intel Core i7-1360P; RAM: 16GB; Ổ cứng: 512GB PCIe® NVMe™ M.2 SSD; VGA: Intel Iris Xe Graphics; Màn hình: 14 inch WUXGA (1920 x 1200), 16:10, IPS, 350nits, DCI-P3 99%; Màu sắc: Đen; OS: Windows 11 Home.', 26349000, 65, 'https://hanoicomputercdn.com/media/product/71766_laptop_lg_gram_14z90r_6.png'),
(3000007, 'Asus ROG P713 Mouse', 40000002, 'Hình dạng chuột được đồng phát triển với các chuyên gia thể thao điện tử để đảm bảo độ ổn định và khả năng kiểm soát tối đa khi vuốt và theo dõi Phần mềm tổng hợp phân tích điểm mạnh và phong cách chơi của người dùng để điều chỉnh cài đặt chuột phù hợp với người chơi Giảm trọng lượng nhờ kỹ thuật tỉ mỉ và cấu trúc vật liệu nylon sinh học sáng tạo', 2699000, 25, 'https://hanoicomputercdn.com/media/product/70572_chuot_khong_day_gaming_asus_rog_harpe_ace_aim_lab_black_p713_bluetooth_wireless_usb_rgb_1.jpg'),
(3000008, 'Logitech G402 Mouse', 40000002, 'Chuột Game FPS nhanh nhất thế giới ! Chuột Logitech G402 sử dụng cảm biến quang học công nghệ Logitech Delta Zero™ tích hợp Fusion Engine™ cho tốc độ lên đến 500IPS. Tích hợp 8 nút có thể lập trình được, gán các tác vụ khác nhau được trên chuột. Cho phép chuyển đổi DPI từ 250 DPI đến 4000 DPI ngay tức thì bằng phím bấm trên chuột.', 639000, 22,'https://hanoicomputercdn.com/media/product/29034_tong_the_mouse_logitech_g402_usb_black.jpg'),
(3000009, 'EDRA EM624 Mouse', 40000002, 'Chuột Edra EM624 Mắt cảm biến 6662IC DPI: 12000 DPI Switch bấm Huano với tuổi thọ 50 triệu lần nhấn Led RGB', 339000, 35, 'https://hanoicomputercdn.com/media/product/60354_chuot_edra_em624_trang_usb_0001_2.jpg'),
(3000010, 'RAPOO M500 Mouse', 40000002, 'Chuột không dây Rapoo M500 Silent Chuẩn kết nối: Wireless 2.4Ghz / Bluetooth Thiết kế công thái học dành cho người thuận tay phải Độ phân giải: 1600 DPI Công nghệ nút bấm Silent', 449000, 12,'https://hanoicomputercdn.com/media/product/70489_chuot_khong_day_rapoo_m500_silent_mau_xanh_wireless_bluetooth_1.jpg'),
(3000011, 'MACHENIKE M7 Mouse', 40000002, 'Chuột Gaming có dây Machenike M7 Pro Wired White Chuẩn kết nối: Dây USB Thiết kế đối xứng Mắt cảm biến: InstantA800 Độ phân giải: 12800 DPI Sử dụng switch bấm Huano với độ bền lên đến 30 triệu lần nhấn Led RGB', 399000, 15, 'https://hanoicomputercdn.com/media/product/70488_chuot_khong_day_rapoo_m500_silent_mau_xam_wireless_bluetooth_1.jpg'),
(3000012, 'DIB OPTICAL Mouse', 40000002, 'Chuột Gaming Razer Viper V3 Pro White Chuẩn kết nối: Wireless 2.4Ghz HyperSpeed / Dây USB Thiết kế form đối xứng Trọng lượng siêu nhẹ chỉ 55g Mắt cảm biến Razer Focus Pro 35K Optical Gen 2 đem lại độ chính xác cực cao Độ phân giải: 35000 DPI', 4499000, 4, 'https://hanoicomputercdn.com/media/product/80761_chuot_vi_tinh_co_day_dib_optical_travel_usb_mouse.jpg'),
(3000013, 'ASUS ROG II 96 Keyboard', 40000003, 'Bàn Phím Cơ Gaming không dây Asus ROG Strix Scope II 96 Wireless; Chuẩn kết nối: Wireless 2.4Ghz / Bluetooth / Dây USB; Layout 96% gọn gàng, đầy đủ chức năng; Switch ROG NX Snow (Linear) đã được pre-lube sẵn / Hỗ trợ Hotswap 5pin Keycap ABS Stabilizer được Pre-lube đem lại cảm giác gõ các phím dài mượt mà; Tích hợp foam tiêu âm, foam switch Hotkey F1-F5 được lập trình tương thích với Xbox Game Bar ;Núm xoay media tiện lợi; ROG Omni Receiver: Kết nối với nhiều thiết bị (Được hỗ trợ) với chỉ một đầu thu; Kê tay công thái học có thể tháo rời', 3899000, 12, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/ban-phim-co-khong-day-asus-rog-strix-scope-ii-96-wireless-5.jpg?v=1706610874147' ),
(3000014, 'AKKO 3098 DS MATCHA Keyboard', 40000003, ': Bàn phím AKKO 3098 DS Matcha Red Bean; Hình thức đẹp; Kết nối: Dây USB, có thể tháo rời; Kích thước: 382x134x40 mm | Trọng lượng ~ 0.97 kg; Hỗ trợ NKRO / Multimedia / Macro / Khóa phím Windows; Keycap: PBT Double-Shot, Cherry profile; Loại switch: Gateron Cap Yellow (linear); Tương thích: Windows / MacOS / Linux.', 1399000, 14, 'https://hanoicomputercdn.com/media/product/78542_ban_phim_akko_3098_ds_matcha_red_bean_gateron_cap_yellow_switch___cu_dep_99.jpg'),
(3000015, 'NEWMEN GM328 Keyboard', 40000003, 'Bàn phím cơ gaming có dây Newmen GM328, Purple-White, Blue Switch; Chuẩn kết nối: Dây USB; Thiết kế layout 1800 - 100 phím; Switch Blue tuổi thọ lên đến 70 triệu lần nhấn; Kaycap ABS Doubleshot', 529000, 52, 'https://newmen.vn/wp-content/uploads/2023/09/4.jpg'),
(3000016, 'EDRA EK506 Keyboard', 40000003, 'Giao diện: USB 2.0; Số lượng phím: 104 Cáp bàn phím dài: 1.3M Kích thước: 444*139*30mm Cân nặng: 530+10g Tương thích hệ điều hành: Windows Màu sắc: màu đen', 179000, 20, 'https://edravn.com/media/product/519_ek506_3.jpg'),
(3000017, 'DAREU EK98 Keyboard', 40000003, 'Triple Mode: Type-C – BT – 2.4G; Keycaps: CHERRY profile, PBT Double-Shot; Cấu trúc: Gasket-Mount; Hỗ trợ hotswap switch Switch: DareU DREAM (Linear) / FIRE-FLY (Tactile) Pin: 4.000mAh; Led nền: RGB Kích thước: 392 x 150 x 40mm | Trọng lượng: 925g; Tương thích: Windows, Mac, Mobile; Keycaps: CHERRY profile, PBT Double-Shot; Cấu trúc: Gasket-Mount; Hỗ trợ hotswap switch với 3 chế độ kết nối: Bluetooth, Wireness, Dây USB -> Type-C', 1199000, 33, 'https://hanoicomputercdn.com/media/product/83010_ban_phim_co_dareu_ek98_pro_proto_3_modes_pbt_rgb_dream_switch__3_.jpg'),
(3000018, 'Logitech PRO X Keyboard', 40000003, 'Bàn phím cơ Logitech Pro X 60 Lightspeed Wireless; Chuẩn kết nối: Wireless 2.4Ghz LightSpeed /Bluetooth / Dây USB; Layout Mini 60%; Switch quang học GX Optical Tactile; Keycap PBT DoubleShot Led RGB LIGHTSYNC; Tích hợp nút cuộn chỉnh âm thanh; Thời lượng pin (có thể sạc lại): lên tới 65 giờ', 4299000, 7, 'https://hanoicomputercdn.com/media/product/82686_ban_phim_co_logitech_pro_x_60_lightspeed_wireless_black_1.jpg');

INSERT INTO accounts (userID, username, password, email, isAdmin) VALUES
(10000001, 'hang', 'hang', 'adfadfsdf@gmail.com', TRUE),
(10000002, 'trang', 'trang', 'adfsddfaf@gmail.com', FALSE),
(10000003, 'admin', 'admin', 'admin@gmail.com', TRUE);


INSERT INTO comments (commentID, content, productID, userID) VALUES
(5000001, 'Sản phẩm này thật tuyệt', 3000001, 10000002);

INSERT INTO orders (orderID, userID, orderDate, totalAmount) VALUES
(60000001, 10000002, '2024-05-15', 2.00);

INSERT INTO orderDetails (orderDetailID, orderID, productID, quantity) VALUES
(70000001, 60000001, 3000001, 1),
(70000002, 60000001, 3000002, 1);