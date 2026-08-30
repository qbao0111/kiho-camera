export interface CameraComparison {
  condition: string;
  targetCameraName: string;
  targetCameraSlug: string;
  reason: string;
}

export interface CameraFaq {
  question: string;
  answer: string;
}

export interface CameraRecommendedScene {
  title: string;
  location: string;
  description: string;
}

export interface CameraSeoContent {
  slug: string;
  modelName: string;
  brand: "Fujifilm" | "Canon" | "Sony";
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  intro: string;
  whoIsItFor: string[];
  recommendedScenes: CameraRecommendedScene[];
  whyRentThis: string[];
  whenToConsiderOthers: CameraComparison[];
  experienceTips: string[];
  faqs: CameraFaq[];
}

export const CAMERA_SEO_CONTENT: Record<string, CameraSeoContent> = {
  // 01. FUJIFILM X100VI
  "fujifilm-x100vi": {
    slug: "fujifilm-x100vi",
    modelName: "Fujifilm X100VI",
    brand: "Fujifilm",
    seoTitle: "Thuê máy ảnh Fujifilm X100VI tại Quảng Bình, Đồng Hới",
    seoDescription: "Dịch vụ thuê máy ảnh Fujifilm X100VI tại Đồng Hới, Quảng Bình. Cảm biến 40.2MP, chống rung IBIS, bộ màu film Reala Ace. Kèm trọn bộ pin sạc, thẻ nhớ.",
    tagline: "Trải nghiệm chụp ảnh đường phố & du lịch cao cấp của hệ máy compact Fujifilm.",

    intro: "Fujifilm X100VI mang đến cảm giác cầm một chiếc máy ảnh rangefinder cổ điển nhưng bên trong là công nghệ hình ảnh thế hệ mới. Với cảm biến 40.2MP sắc nét, hệ thống chống rung cảm biến IBIS 6 stops và bộ lọc màu film Reala Ace, chiếc máy này phù hợp cho những ai yêu thích trải nghiệm ngắm chụp trực quan khi dạo quanh Đồng Hới hay khám phá các cung đường ven biển Quảng Bình.",
    whoIsItFor: [
      "Những bạn yêu thích trải nghiệm chụp máy cơ cổ điển và ngắm khung hình qua kính ngắm hybrid.",
      "Người đam mê tông màu Film Simulation đặc trưng của Fujifilm để có ảnh dùng ngay từ máy.",
      "Khách du lịch muốn một thân máy compact nguyên khối cao cấp, đầm tay và không phải mang theo nhiều ống kính.",
      "Các cặp đôi tìm kiếm chất ảnh có chiều sâu cảm xúc cho bộ ảnh du lịch Quảng Bình."
    ],
    recommendedScenes: [
      {
        title: "Dạo phố hoàng hôn & quán cafe",
        location: "Đồng Hới & ven sông Nhật Lệ",
        description: "Ống kính 23mm f/2 khẩu độ lớn bắt trọn ánh đèn vàng ấm áp và không gian chill tại các quán cafe ngắm sông."
      },
      {
        title: "Gió lộng & cát trắng",
        location: "Đồi cát Quang Phú & Bãi Đá Nhảy",
        description: "Màu film Reala Ace và Classic Chrome tái tạo hạt cát mịn, bầu trời xanh ngắt và độ tương phản tự nhiên."
      },
      {
        title: "Ký sự đường phố & đời thường",
        location: "Chợ Đồng Hới & làng chài Bảo Ninh",
        description: "Hệ thống chống rung IBIS trong thân máy giúp bạn tự tin chụp nhanh những khoảnh khắc đời thường mà không lo rung tay."
      }
    ],
    whyRentThis: [
      "Độ phân giải 40.2MP sắc nét: Cho phép bạn crop ảnh linh hoạt sau chuyến đi mà độ chi tiết vẫn rõ ràng.",
      "Chống rung cảm biến IBIS 6 stops: Giúp việc chụp đêm, chụp trong hang động hoặc lúc ánh sáng yếu trở nên dễ dàng và ổn định hơn.",
      "20 chế độ Film Simulation tích hợp sẵn: Bao gồm các giả lập màu như Reala Ace, Nostalgic Neg và Classic Neg."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn trải nghiệm màu film Fuji kinh điển nhưng muốn tối ưu chi phí hơn",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "X100V vẫn giữ trọn vẹn thiết kế rangefinder và màu Classic Neg trứ danh với mức giá thuê mềm hơn."
      },
      {
        condition: "Cần ống kính zoom linh hoạt để vừa chụp phong cảnh xa vừa chụp chân dung cận cảnh",
        targetCameraName: "Fujifilm X-S10",
        targetCameraSlug: "fujifilm-xs10",
        reason: "X-S10 dùng ngàm thay đổi ống kính linh hoạt và có báng cầm tay sâu chắc chắn hơn."
      },
      {
        condition: "Ưu tiên khả năng bắt nét tự động bám mắt cho trẻ nhỏ hoặc người chạy nhảy",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Hệ thống lấy nét Dual Pixel AF II của Canon R50 cực kỳ thân thiện và nhạy bén với người mới."
      }
    ],
    experienceTips: [
      "Ống kính 23mm tương đương tiêu cự 35mm trên Full-Frame — góc nhìn tự nhiên cho ảnh đời thường, bạn chỉ cần bước tới hoặc lùi lại một chút là có ngay góc chụp ưng ý.",
      "Hãy thử chuyển đổi giữa kính ngắm quang học (OVF) và kính ngắm điện tử (EVF) bằng cần gạt phía trước thân máy để cảm nhận sự thú vị.",
      "Tụi mình luôn chuẩn bị sẵn đầu đọc thẻ OTG trong túi máy, bạn có thể cắm trực tiếp vào điện thoại để nhận ảnh nhanh chóng."
    ],
    faqs: [
      {
        question: "Fujifilm X100VI có khó sử dụng cho người chưa từng cầm máy ảnh không?",
        answer: "X100VI có các vòng xoay khẩu độ, tốc độ và ISO vật lý trực quan. Nếu bạn là người mới, tụi mình sẽ hướng dẫn chuyển máy về chế độ tự động hoàn toàn (Auto) và cài sẵn các công thức màu film đẹp, bạn chỉ cần ngắm và bấm chụp."
      },
      {
        question: "X100VI khác biệt lớn nhất gì so với X100V khi đi du lịch Quảng Bình?",
        answer: "Khác biệt rõ nhất là cảm biến 40.2MP (so với 26.1MP của X100V) giúp ảnh chi tiết hơn và hệ thống chống rung IBIS 6 stops hỗ trợ chụp trong điều kiện thiếu sáng hoặc rung lắc khi di chuyển mà không bị nhòe."
      },
      {
        question: "Thuê máy Fujifilm X100VI tại Kiho có kèm theo thẻ nhớ và pin phụ không?",
        answer: "Có. Bộ máy X100VI tại Kiho Camera luôn bao gồm: thân máy, 2 pin, sạc, thẻ nhớ, túi chống sốc thời trang và đầu đọc thẻ OTG cho điện thoại."
      },
      {
        question: "Mình muốn chụp ảnh hoàng hôn biển Nhật Lệ nên dùng chế độ màu film nào trên X100VI?",
        answer: "Reala Ace hoặc Classic Chrome là hai giả lập film rất hợp với ánh sáng vàng cam của biển Nhật Lệ, giúp da người ấm áp mà màu trời không bị gắt."
      }
    ]
  },

  // 02. FUJIFILM X100V
  "fujifilm-x100v": {
    slug: "fujifilm-x100v",
    modelName: "Fujifilm X100V",
    brand: "Fujifilm",
    seoTitle: "Thuê máy ảnh Fujifilm X100V tại Quảng Bình, Đồng Hới",
    seoDescription: "Dịch vụ cho thuê Fujifilm X100V màu film Classic Negative tại Đồng Hới, Quảng Bình. Máy gọn nhẹ, kèm trọn bộ 2 pin, sạc và thẻ nhớ.",
    tagline: "Chiếc máy ảnh film kỹ thuật số định hình phong cách sống và những khung hình hoài niệm.",

    intro: "Fujifilm X100V là chiếc máy ảnh compact rangefinder được yêu thích rộng rãi nhờ thiết kế hợp kim nhôm sang trọng, ống kính 23mm f/2 sắc nét và tone màu Classic Negative giàu cảm xúc. Mỗi bức ảnh mang lại cảm giác hoài niệm ấm áp giữa lòng Đồng Hới.",
    whoIsItFor: [
      "Những bạn trẻ yêu thích phong cách ảnh du lịch nghệ thuật, hoài niệm và đậm chất thơ.",
      "Cặp đôi muốn lưu giữ kỷ niệm chuyến đi Quảng Bình với những bức ảnh tone màu ấm áp, giàu cảm xúc.",
      "Người đi cafe, dạo phố, chụp ảnh OOTD cần một chiếc máy nhỏ gọn, thanh lịch.",
      "Những ai muốn có ảnh chất lượng gửi sang điện thoại nhanh chóng qua đầu đọc thẻ OTG."
    ],

    recommendedScenes: [
      {
        title: "Quán cafe & không gian vintage",
        location: "Khu phố trung tâm TP. Đồng Hới",
        description: "Màu Classic Negative tôn lên chất liệu gỗ, ánh đèn vàng và tạo hạt noise dịu nhẹ rất hợp mắt."
      },
      {
        title: "Dạo biển chiều muộn",
        location: "Biển Nhật Lệ & bãi tắm Bảo Ninh",
        description: "Màn hình lật 2 chiều hỗ trợ chụp góc thấp sát mặt cát và bắt trọn từng con sóng vỗ."
      },
      {
        title: "Khám phá thiên nhiên di sản",
        location: "Đường mòn Phong Nha & suối Nước Moọc",
        description: "Tái hiện sắc xanh của rừng nguyên sinh và dòng nước ngọc bích với độ trong trẻo đặc trưng."
      }
    ],
    whyRentThis: [
      "Tone màu Classic Negative đặc trưng: Tạo độ tương phản sâu ở vùng tối và màu da hơi ngả ấm, mang lại cảm giác màu film 35mm hoài niệm.",
      "Thiết kế rangefinder gọn gàng: Dễ dàng mang theo cả ngày dài dạo chơi mà không cảm thấy cồng kềnh hay nặng nề.",
      "Màn hình cảm ứng lật mỏng nhẹ: Giúp bạn thoải mái sáng tạo các góc chụp độc đáo từ trên cao hoặc ngang thắt lưng."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn độ phân giải cực cao 40MP và có thêm chống rung thân máy",
        targetCameraName: "Fujifilm X100VI",
        targetCameraSlug: "fujifilm-x100vi",
        reason: "X100VI là phiên bản nâng cấp mạnh mẽ về độ chi tiết và khả năng chống rung cầm tay."
      },
      {
        condition: "Ưu tiên tông màu ảnh tươi tắn và lấy nét tự động nhận diện người/mắt",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 có tông màu tươi tắn và ống kính zoom tiện lợi cho người mới."
      },
      {
        condition: "Cần máy siêu nhỏ đút vừa túi áo khoác cho chuyến đi năng động",
        targetCameraName: "Canon G7 X Mark III",
        targetCameraSlug: "canon-g7x-mark-iii",
        reason: "G7 X III có kích thước compact bỏ túi và màn hình lật ngược 180 độ chụp selfie tiện lợi."
      }
    ],
    experienceTips: [
      "Hãy thử gán các phím tắt nhanh cho các giả lập film như Classic Neg, Astia và Monochrome để đổi vibe ảnh chỉ sau một nút bấm.",
      "Ống kính 23mm cố định giúp bạn rèn luyện tư duy bố cục — thay vì zoom bằng tay, bạn hãy tiến lại gần chủ thể để tạo độ sâu trường ảnh ấn tượng.",
      "Khi nhận máy tại Kiho, tụi mình sẽ cài đặt sẵn các Film Recipe thịnh hành nhất để bạn chụp ra ảnh ưng ý ngay lập tức."
    ],
    faqs: [
      {
        question: "Fujifilm X100V có zoom ra xa gần được không?",
        answer: "X100V trang bị ống kính fix 23mm f/2 cố định (không zoom quang học), giúp thân máy mỏng nhẹ và chất lượng quang học đạt độ nét rất cao. Khi cần góc rộng hay cận cảnh, bạn chỉ cần di chuyển vị trí đứng linh hoạt."
      },
      {
        question: "Đi chụp ban đêm tại Đồng Hới với X100V có đẹp không?",
        answer: "Rất đẹp. Ống kính khẩu độ lớn f/2.0 thu sáng tốt kết hợp với giả lập film trắng đen Acros hoặc Classic Chrome khi chụp phố đêm có đèn đường sẽ tạo ra những bức ảnh rất có hồn."
      },
      {
        question: "Làm thế nào để lấy ảnh từ máy X100V sang iPhone hoặc điện thoại Android?",
        answer: "Bộ thuê máy tại Kiho luôn đi kèm đầu đọc thẻ nhớ OTG hỗ trợ kết nối trực tiếp với điện thoại. Bạn chỉ cần rút thẻ nhớ cắm qua đầu đọc vào điện thoại là có thể xem và lưu ảnh về máy nhanh chóng."
      }
    ]
  },

  // 03. FUJIFILM X-S10
  "fujifilm-xs10": {
    slug: "fujifilm-xs10",
    modelName: "Fujifilm X-S10",
    brand: "Fujifilm",
    seoTitle: "Thuê máy ảnh Fujifilm X-S10 tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh Fujifilm X-S10 kèm lens tại Đồng Hới, Quảng Bình. Chống rung IBIS 5 trục, màn xoay lật đa góc, màu film Fuji. Kèm pin và thẻ nhớ.",
    tagline: "Sự kết hợp giữa màu film Fuji và báng cầm công thái học đầm chắc.",

    intro: "Nếu bạn thích màu ảnh của Fujifilm nhưng muốn một chiếc máy có báng cầm tay sâu, chống rung cảm biến IBIS 5 trục và màn hình xoay lật đa góc linh hoạt để vừa chụp vừa quay vlog, Fujifilm X-S10 chính là lựa chọn thích hợp. Chiếc máy này cân bằng tốt giữa nhu cầu chụp ảnh phong cảnh du lịch và quay video khi khám phá Quảng Bình, Phong Nha.",
    whoIsItFor: [
      "Những ai thích màu film Fuji nhưng muốn ống kính zoom để thay đổi góc chụp linh hoạt theo địa hình.",
      "Người thích quay video ngắn, travel vlog với màn hình xoay lật 180 độ ra phía trước.",
      "Khách đi tour trekking Phong Nha, hang động cần một thân máy có báng cầm sâu đầm tay, chống trượt khi di chuyển.",
      "Người muốn một chiếc máy vừa chụp chân dung xóa phông vừa quay clip kỷ niệm mượt mà."
    ],
    recommendedScenes: [
      {
        title: "Hành trình khám phá thiên nhiên",
        location: "Vườn quốc gia Phong Nha - Kẻ Bàng & Sông Chày",
        description: "Báng cầm sâu giúp giữ máy chắc chắn trên thuyền kayak, màn hình xoay lật dễ dàng căn góc quay từ thấp đến cao."
      },
      {
        title: "Chân dung ngoại cảnh chiều tà",
        location: "Đồi cát Quang Phú & Bãi Đá Nhảy",
        description: "Chế độ Film Simulation Eterna và Astia tái hiện làn da mềm mại dưới ánh hoàng hôn dịu nhẹ."
      },
      {
        title: "Vlog ẩm thực & dạo phố đêm",
        location: "Khu phố ẩm thực Đồng Hới & chợ đêm",
        description: "Chống rung IBIS kết hợp màn hình xoay lật giúp bạn tự quay bản thân review món ăn mà không bị giật khung hình."
      }
    ],
    whyRentThis: [
      "Chống rung cảm biến IBIS 5 trục: Giúp bạn quay video cầm tay mượt mà và chụp ảnh thiếu sáng sắc nét hơn.",
      "Màn hình xoay lật đa góc (Vari-angle): Linh hoạt tối đa cho cả góc chụp đứng, góc thấp sát đất và quay selfie trực diện.",
      "18 chế độ Film Simulation: Tận hưởng các giả lập màu như Classic Neg, Classic Chrome, Eterna và Pro Neg."
    ],
    whenToConsiderOthers: [
      {
        condition: "Thích kiểu dáng rangefinder hoài cổ siêu nhỏ gọn đút vừa túi",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "X100V có thân máy mỏng gọn hơn và mang lại trải nghiệm hoài cổ đậm nét hơn."
      },
      {
        condition: "Ưu tiên máy lấy nét nhận diện người/mắt thân thiện cho người mới",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 nhẹ hơn và có hệ thống lấy nét Dual Pixel CMOS AF II nhận diện người/mắt nhanh chóng."
      },
      {
        condition: "Muốn máy compact nhỏ gọn chuyên quay vlog",
        targetCameraName: "Sony ZV-1 Mark II",
        targetCameraSlug: "sony-zv1-mark-ii",
        reason: "Sony ZV-1 II có trọng lượng siêu nhẹ 292g và ống kính góc rộng 18mm chuyên biệt cho vlog."
      }
    ],
    experienceTips: [
      "Khi quay vlog ngoài trời, bạn có thể chọn giả lập màu Eterna để video có độ tương phản dịu mắt chuẩn điện ảnh.",
      "Báng tay cầm của X-S10 sâu và đầm, bạn có thể thoải mái cầm một tay khi di chuyển mà không bị mỏi.",
      "Tận dụng vòng xoay chế độ trên đỉnh máy để lưu nhanh các bộ tùy chỉnh màu film yêu thích vào các vị trí C1, C2, C3, C4."
    ],
    faqs: [
      {
        question: "Fujifilm X-S10 thuê tại Kiho có kèm theo ống kính chưa?",
        answer: "Có. Bộ máy X-S10 tại Kiho Camera luôn được trang bị sẵn ống kính zoom Fujinon đa dụng, đáp ứng tốt cả nhu cầu chụp phong cảnh góc rộng lẫn chụp chân dung xóa phông."
      },
      {
        question: "X-S10 có tự quay vlog và xem được màn hình từ phía trước không?",
        answer: "Có. Màn hình của X-S10 là dạng xoay lật đa góc 180 độ ra phía trước, giúp bạn dễ dàng tự căn khung hình khi quay video, chụp selfie nhóm hoặc sáng tạo nội dung TikTok/Reels."
      },
      {
        question: "Pin của Fujifilm X-S10 có đủ dùng cho một ngày tham quan Phong Nha không?",
        answer: "Bộ thuê tại Kiho luôn đi kèm 2 pin kèm sạc để bạn yên tâm sử dụng trong suốt chuyến tham quan trong ngày."
      }
    ]
  },

  // 04. CANON M100
  "canon-m100": {
    slug: "canon-m100",
    modelName: "Canon EOS M100",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon EOS M100 tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh Canon M100 màu trắng tại Đồng Hới, Quảng Bình. Màn hình lật selfie 180 độ, màu da sáng tự nhiên, giá thuê tiết kiệm.",
    tagline: "Chiếc máy ảnh nhỏ xinh, màu da sáng tự nhiên và cực kỳ dễ làm quen.",

    intro: "Canon EOS M100 phiên bản màu trắng thanh lịch là lựa chọn thân thiện cho các bạn trẻ và bạn nữ trong những chuyến du lịch check-in. Thiết kế nhỏ gọn chỉ khoảng 302g, màn hình cảm ứng lật 180 độ chuyên selfie và tone màu da sáng tự nhiên đặc trưng của Canon giúp bạn có ngay những khung hình tươi tắn.",
    whoIsItFor: [
      "Các bạn học sinh, sinh viên hoặc người mới lần đầu trải nghiệm máy ảnh du lịch.",
      "Những bạn nữ tìm kiếm chiếc máy ảnh màu trắng nhỏ gọn, nhẹ nhàng vừa vặn trong túi xách.",
      "Cặp đôi hoặc nhóm bạn muốn chụp selfie, check-in quán cafe và dạo biển với chi phí thuê tiết kiệm.",
      "Người muốn chất lượng ảnh vượt trội hơn điện thoại nhưng vẫn giữ thao tác chạm chụp đơn giản."
    ],
    recommendedScenes: [
      {
        title: "Selfie & check-in cùng bạn bè",
        location: "Các quán cafe đẹp tại TP. Đồng Hới",
        description: "Màn hình lật 180 độ kết hợp chế độ làm mịn da tự nhiên giúp cả nhóm có ảnh selfie lung linh."
      },
      {
        title: "Chụp ảnh phong cách nàng thơ",
        location: "Bờ biển Nhật Lệ & đồi cỏ",
        description: "Ống kính 15-45mm IS STM cho góc chụp linh hoạt, tái hiện làn da sáng dưới ánh nắng tự nhiên."
      },
      {
        title: "Dạo chơi cuối tuần",
        location: "Cầu Nhật Lệ & công viên Đồng Hới",
        description: "Thân máy siêu nhẹ 302g giúp bạn thoải mái mang theo cả buổi mà không cảm thấy vướng víu."
      }
    ],
    whyRentThis: [
      "Màu da sáng tự nhiên: Thuật toán xử lý màu da chân dung của Canon giúp gương mặt luôn sáng rạng rỡ và tươi tắn.",
      "Giao diện cảm ứng chạm chụp thông minh: Dễ sử dụng như màn hình smartphone, chỉ cần chạm vào điểm muốn lấy nét trên màn hình là máy tự chụp.",
      "Chi phí thuê cực kỳ tiết kiệm: Lựa chọn lý tưởng cho các chuyến đi ngắn ngày hoặc buổi hẹn hò cuối tuần."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn lấy nét bám mắt thông minh hơn và quay video 4K sắc nét",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 thuộc thế hệ ngàm R mới nhất với cảm biến DIGIC X và khả năng bắt nét mắt nhanh chóng."
      },
      {
        condition: "Muốn máy compact đút túi áo không cần ống kính rời",
        targetCameraName: "Canon G7 X Mark III",
        targetCameraSlug: "canon-g7x-mark-iii",
        reason: "G7 X III có kích thước bỏ túi nhỏ gọn hơn và ống kính zoom quang học liền thân."
      },
      {
        condition: "Yêu thích chất ảnh retro hoài cổ và các giả lập màu film hạt",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "Fujifilm X100V mang lại trải nghiệm màu film cổ điển và thiết kế rangefinder sang trọng."
      }
    ],
    experienceTips: [
      "Khi chụp selfie một mình hoặc đôi bạn, chỉ cần lật màn hình lên 180 độ — máy sẽ tự động kích hoạt giao diện chụp chân dung tiện lợi.",
      "Ống kính kit 15-45mm có khóa zoom an toàn, bạn nhớ xoay nhẹ vòng zoom để mở ống kính trước khi bắt đầu chụp nhé.",
      "Tụi mình sẽ hướng dẫn bạn cách chỉnh sáng nhanh ngay trên màn hình cảm ứng chỉ trong 2 phút khi nhận máy."
    ],
    faqs: [
      {
        question: "Canon M100 có chụp tự sướng (selfie) được không?",
        answer: "Được và rất tiện lợi. Màn hình cảm ứng của M100 có thể lật ngược 180 độ lên phía trên, cho phép bạn nhìn thấy rõ khung hình của mình để căn góc chụp đẹp nhất cùng bạn bè."
      },
      {
        question: "Máy Canon M100 có kèm sẵn ống kính khi thuê không?",
        answer: "Có. Bộ máy Canon M100 tại Kiho luôn đi kèm ống kính zoom Canon EF-M 15-45mm IS STM có chống rung quang học, trọn bộ 2 pin, sạc và thẻ nhớ."
      },
      {
        question: "Người chưa từng dùng máy ảnh bao giờ có chụp đẹp được với M100 không?",
        answer: "Hoàn toàn được. M100 có chế độ Tự động thông minh (Scene Intelligent Auto), máy sẽ tự nhận diện khuôn mặt và cân chỉnh ánh sáng, bạn chỉ việc ngắm và chạm màn hình để chụp."
      }
    ]
  },

  // 05. CANON EOS RP
  "canon-eos-rp": {
    slug: "canon-eos-rp",
    modelName: "Canon EOS RP",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon EOS RP Full-Frame tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh Full-Frame Canon EOS RP tại Đồng Hới, Quảng Bình. Cảm biến Full-Frame 26.2MP xóa phông mượt mà, màu ảnh trong trẻo.",
    tagline: "Chiếc máy ảnh Full-Frame gọn nhẹ mang lại độ sâu trường ảnh và độ xóa phông ấn tượng.",
    intro: "Canon EOS RP là lựa chọn hàng đầu cho những ai tìm kiếm chất lượng hình ảnh từ cảm biến Full-Frame 26.2MP. Khả năng xóa phông mượt mà, dải tương phản rộng và khử nhiễu tốt trong điều kiện ánh sáng yếu giúp những bộ ảnh chân dung, ảnh kỷ niệm couple tại Quảng Bình đạt độ trong trẻo và chiều sâu rõ rệt.",
    whoIsItFor: [
      "Những bạn muốn trải nghiệm chất lượng ảnh của cảm biến Full-Frame lớn.",
      "Cặp đôi chụp ảnh pre-wedding, kỷ niệm tình yêu cần độ xóa phông mịn màng và làm nổi bật chủ thể.",
      "Người chụp ảnh chân dung ngoại cảnh tại bờ biển, đồi cát hoặc rừng thông.",
      "Nhiếp ảnh gia nghiệp dư hoặc du khách muốn những khung hình có chiều sâu quang học rõ rệt."
    ],
    recommendedScenes: [
      {
        title: "Bộ ảnh đôi & Chân dung xóa phông",
        location: "Biển Nhật Lệ & bãi đá Bảo Ninh",
        description: "Cảm biến Full-Frame tách bạch chủ thể khỏi hậu cảnh, tạo hiệu ứng bokeh mịn màng."
      },
      {
        title: "Khoảnh khắc hoàng hôn & chạng vạng",
        location: "Cồn cát Quang Phú & đồi thông",
        description: "Dải tương phản dynamic range rộng giúp giữ lại trọn vẹn cả vệt nắng cuối trời lẫn chi tiết bóng râm."
      },
      {
        title: "Chụp kỷ niệm gia đình & sự kiện",
        location: "Resort & không gian tiệc tại Đồng Hới",
        description: "Màu da trong trẻo, chân thực và khả năng chụp thiếu sáng sạch hạt không cần đèn flash gắt."
      }
    ],
    whyRentThis: [
      "Cảm biến Full-Frame 26.2MP: Mang lại độ chuyển vùng sáng - tối mượt mà và khả năng xóa mờ phông nền có chiều sâu.",
      "Hệ thống lấy nét Dual Pixel AF với 4.779 điểm: Bắt nét chính xác vào mắt chủ thể kể cả khi đang mở khẩu lớn.",
      "Thân máy Full-Frame gọn nhẹ 485g: Cơ động khi di chuyển giữa các điểm tham quan tại Quảng Bình."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn máy nhỏ gọn hơn với chip DIGIC X và nhận diện người/mắt nhanh nhẹn",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 nhỏ nhẹ hơn và có hệ thống lấy nét Dual Pixel CMOS AF II thế hệ mới."
      },
      {
        condition: "Yêu thích màu film hoài niệm cổ điển không cần chỉnh sửa",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "X100V có sẵn các giả lập màu film Fuji đặc trưng và kích thước compact hơn."
      },
      {
        condition: "Cần máy siêu gọn nhẹ bỏ túi áo chuyên quay vlog hàng ngày",
        targetCameraName: "Sony ZV-1 Mark II",
        targetCameraSlug: "sony-zv1-mark-ii",
        reason: "Sony ZV-1 II có góc siêu rộng 18mm và micro lọc gió tối ưu hóa cho video."
      }
    ],
    experienceTips: [
      "Tận dụng màn hình xoay lật của EOS RP để chụp những góc thấp sát mặt đất — hiệu ứng xóa phông Full-Frame ở góc này sẽ rất ấn tượng.",
      "Khi chụp chân dung ngược sáng lúc hoàng hôn, hãy bật tính năng lấy nét nhận diện mắt (Eye AF) để máy tự khóa nét vào ánh mắt người mẫu.",
      "Tụi mình luôn chuẩn bị trọn bộ pin phụ và sạc để bạn yên tâm tác nghiệp suốt buổi chụp."
    ],
    faqs: [
      {
        question: "Cảm biến Full-Frame trên Canon RP có gì khác biệt so với máy ảnh thông thường?",
        answer: "Cảm biến Full-Frame có diện tích thu nhận ánh sáng lớn hơn so với cảm biến APS-C hoặc điện thoại. Điều này giúp ảnh có độ chuyển màu mượt mà hơn, xóa phông mịn màng hơn và kiểm soát nhiễu hạt tốt hơn khi chụp thiếu sáng."
      },
      {
        question: "Canon EOS RP có phù hợp cho người mới lần đầu chụp không?",
        answer: "EOS RP có giao diện hướng dẫn trực quan (Feature Assistant) hiển thị bằng tiếng Việt trên màn hình cảm ứng, giúp bạn dễ dàng hiểu được các hiệu ứng xóa phông hay làm sáng ảnh trước khi bấm chụp."
      },
      {
        question: "Bộ thuê Canon EOS RP tại Kiho Camera bao gồm những phụ kiện gì?",
        answer: "Bộ thuê Canon RP gồm có: thân máy Canon EOS RP, ống kính Canon, 2 pin, sạc, thẻ nhớ, túi chống sốc và đầu đọc thẻ OTG."
      }
    ]
  },

  // 06. CANON G7 X MARK III
  "canon-g7x-mark-iii": {
    slug: "canon-g7x-mark-iii",
    modelName: "Canon G7 X Mark III",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon G7 X Mark III tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh compact du lịch Canon G7 X Mark III tại Đồng Hới, Quảng Bình. Màn lật selfie, màu da tươi sáng, quay video 4K sắc nét.",
    tagline: "Chiếc máy ảnh compact du lịch bỏ túi áo, sinh ra cho các thước phim ngắn và ảnh check-in.",
    intro: "Canon PowerShot G7 X Mark III là cái tên quen thuộc trong cộng đồng du lịch và sáng tạo nội dung. Nhờ ống kính zoom quang học 24-100mm f/1.8-2.8 sắc nét, cảm biến 1.0-inch 20.1MP và màn hình lật 180 độ hỗ trợ selfie, chiếc máy này vừa đủ nhỏ gọn để bỏ vào túi áo khoác, vừa đủ mạnh mẽ để mang lại những khung hình rạng rỡ suốt chuyến đi Quảng Bình.",
    whoIsItFor: [
      "Khách du lịch muốn một chiếc máy nhỏ gọn tối đa, không cần thay đổi ống kính phức tạp.",
      "Những bạn đam mê quay travel vlog, TikTok, Instagram Reels với màu da sáng tự nhiên.",
      "Các bạn nữ thích chụp ảnh selfie, chụp đồ ăn, cafe check-in và khoảnh khắc dạo phố.",
      "Người muốn một chiếc máy chất lượng cao hơn hẳn smartphone nhưng thao tác bấm máy nhanh chóng."
    ],

    recommendedScenes: [
      {
        title: "Dạo biển & Bể bơi resort",
        location: "Biển Nhật Lệ & khu nghỉ dưỡng Bảo Ninh",
        description: "Khẩu độ lớn f/1.8 giúp bắt sáng tốt và tạo độ mờ hậu cảnh nhẹ nhàng cho ảnh bikini và đồ dạo biển."
      },
      {
        title: "Check-in ẩm thực & Cafe",
        location: "Trung tâm TP. Đồng Hới",
        description: "Ống kính zoom 4.2x linh hoạt giúp chụp cận cảnh món ăn ngon hoặc góc trang trí mà không cần đứng dậy."
      },
      {
        title: "Travel Vlog hành trình",
        location: "Khám phá hang động Phong Nha & Suối Moọc",
        description: "Quay video 4K không bị crop khung hình và màn hình lật tiện lợi theo dõi bố cục liên tục."
      }
    ],
    whyRentThis: [
      "Ống kính khẩu lớn f/1.8 - f/2.8 với dải zoom 24-100mm: Đa năng từ góc rộng chụp phong cảnh đến zoom chụp chân dung bán thân.",
      "Tông màu ảnh tươi tắn và nịnh mắt: Phù hợp cho ảnh selfie, cafe và dạo phố.",
      "Thiết kế bỏ túi siêu gọn 304g: Sẵn sàng rút ra chụp bất cứ khoảnh khắc nào trong tích tắc."
    ],
    whenToConsiderOthers: [
      {
        condition: "Cần góc quay rộng 18mm để quay vlog nhóm từ cự ly gần",
        targetCameraName: "Sony ZV-1 Mark II",
        targetCameraSlug: "sony-zv1-mark-ii",
        reason: "Sony ZV-1 II có góc rộng 18mm và micro 3 capsule kèm bông lọc gió ngoài trời."
      },
      {
        condition: "Muốn trải nghiệm máy ảnh ống kính rời có thể xóa phông sâu hơn",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 trang bị cảm biến APS-C lớn hơn và khả năng thay đổi các loại ống kính RF."
      },
      {
        condition: "Thích chất ảnh flash đêm mang phong cách Y2K cổ điển",
        targetCameraName: "Canon IXY 640",
        targetCameraSlug: "canon-ixy-640",
        reason: "Canon IXY 640 là dòng máy digicam nhỏ gọn chuyên tạo hiệu ứng flash vintage độc lạ."
      }
    ],
    experienceTips: [
      "Khi chụp selfie nhóm, bạn hãy để ống kính ở tiêu cự 24mm rộng nhất và lật màn hình lên 180 độ để lấy trọn vẹn cả khung cảnh phía sau.",
      "Vòng xoay trên thân ống kính có thể dùng để zoom nhanh hoặc chỉnh bù trừ sáng (+/-) rất tiện lợi.",
      "Tụi mình luôn trang bị sẵn 2 pin sạc đầy và đầu đọc thẻ OTG để bạn chuyển ngay video 4K vào điện thoại đăng story."
    ],
    faqs: [
      {
        question: "Canon G7 X Mark III có quay được video khung dọc cho TikTok và Reels không?",
        answer: "Có. G7 X Mark III hỗ trợ quay video khung dọc tự động. Khi bạn cầm máy đứng để quay, file video xuất ra sẽ giữ nguyên định dạng dọc để bạn đăng tải trực tiếp lên TikTok hay Instagram Reels mà không cần xoay lại."
      },
      {
        question: "G7 X Mark III khác gì so với dòng máy Canon R50?",
        answer: "G7 X III là dòng máy compact ống kính gắn liền, kích thước nhỏ gọn đút vừa túi áo. Trong khi đó Canon R50 là máy ảnh mirrorless cảm biến APS-C lớn hơn và có thể thay đổi được ống kính rời."
      },
      {
        question: "Ống kính của G7 X Mark III có chụp xóa phông được không?",
        answer: "Có. Với khẩu độ lớn f/1.8 ở góc rộng và f/2.8 ở góc tele, G7 X III có thể tạo ra độ mờ hậu cảnh tự nhiên rất đẹp khi bạn chụp người hoặc tĩnh vật ở cự ly gần."
      }
    ]
  },

  // 07. CANON EOS R50
  "canon-eos-r50": {
    slug: "canon-eos-r50",
    modelName: "Canon EOS R50",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon EOS R50 tại Quảng Bình, Đồng Hới",
    seoDescription: "Dịch vụ cho thuê máy ảnh Canon EOS R50 chính hãng tại Đồng Hới, Quảng Bình. Lấy nét mắt Dual Pixel AF II, màu da sáng tự nhiên, quay video 4K sắc nét.",
    tagline: "Chiếc máy ảnh mirrorless thân thiện cho người mới — dễ dùng, bắt nét mắt nhanh và màu ảnh tươi sáng.",

    intro: "Canon EOS R50 là chiếc máy ảnh được nhiều khách du lịch lựa chọn khi ghé thăm Quảng Bình. Nhờ cảm biến APS-C 24.2MP, bộ xử lý DIGIC X và hệ thống lấy nét Dual Pixel AF II nhận diện người/mắt chính xác, R50 giúp bạn dễ dàng lưu lại những khoảnh khắc đẹp trong suốt hành trình từ Đồng Hới đến Phong Nha.",
    whoIsItFor: [
      "Người lần đầu tiên thuê hoặc sử dụng máy ảnh, muốn một thiết bị dễ chụp và bắt nét nhanh.",
      "Cặp đôi và nhóm bạn muốn lưu giữ trọn vẹn từng khoảnh khắc du lịch tại Đồng Hới, Phong Nha.",
      "Người sáng tạo nội dung, làm vlog, quay clip ngắn với chất lượng video 4K sắc nét.",
      "Những ai tìm kiếm một chiếc máy gọn nhẹ (khoảng 375g), tính năng hiện đại và mức giá thuê hợp lý."
    ],
    recommendedScenes: [
      {
        title: "Khám phá động Phong Nha & Thiên Đường",
        location: "Vườn quốc gia Phong Nha - Kẻ Bàng",
        description: "Khả năng lấy nét trong điều kiện ánh sáng yếu và màu ảnh trong trẻo bắt trọn vẻ đẹp của thạch nhũ nghìn năm."
      },
      {
        title: "Dạo biển hoàng hôn & Cát trắng",
        location: "Biển Nhật Lệ & đồi cát Quang Phú",
        description: "Tông màu da tươi sáng đặc trưng của Canon kết hợp với màu trời chiều tạo nên khung hình kỷ niệm đáng nhớ."
      },
      {
        title: "Hẹn hò cafe & Dạo phố đêm",
        location: "Phố ẩm thực & đường bờ sông Đồng Hới",
        description: "Màn hình xoay lật cảm ứng đa góc giúp dễ dàng chụp ảnh đôi hoặc tự quay video ngắn kỷ niệm."
      }
    ],
    whyRentThis: [
      "Lấy nét tự động Dual Pixel AF II nhận diện mắt: Bạn chỉ cần hướng máy về phía người chụp, máy sẽ tự động theo dõi và khóa nét vào khuôn mặt/mắt.",
      "Trọng lượng gọn nhẹ khoảng 375g: Cầm trên tay thoải mái khi di chuyển tham quan cả ngày dài.",
      "Quay video 4K 30p sắc nét: Mang lại độ chi tiết cao cho các thước phim du lịch chất lượng."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn một chiếc máy bỏ túi áo nhỏ gọn hơn nữa mà không cần ống kính rời",
        targetCameraName: "Canon G7 X Mark III",
        targetCameraSlug: "canon-g7x-mark-iii",
        reason: "G7 X Mark III có thiết kế compact bỏ túi áo tiện lợi cho các chuyến đi dạo nhẹ nhàng."
      },
      {
        condition: "Yêu thích màu film hoài niệm cổ điển và các núm xoay cơ học",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "Fujifilm X100V mang phong cách rangefinder và các bộ lọc màu film nổi tiếng như Classic Negative."
      },
      {
        condition: "Muốn độ sâu trường ảnh Full-Frame tối đa cho bộ ảnh cưới hay chân dung nghệ thuật",
        targetCameraName: "Canon EOS RP",
        targetCameraSlug: "canon-eos-rp",
        reason: "Canon EOS RP trang bị cảm biến Full-Frame lớn hơn với khả năng xóa phông sâu hơn."
      }
    ],
    experienceTips: [
      "Hãy bật chế độ Auto Focus nhận diện khuôn mặt/mắt để máy tự động bám nét vào chủ thể trong khung hình.",
      "Màn hình xoay lật có thể mở sang bên cạnh và xoay 180 độ ra phía trước, tiện khi cả nhóm muốn tự chụp chung.",
      "Tụi mình luôn chuẩn bị sẵn dây đeo cổ, túi chống sốc và đầu đọc thẻ OTG cắm thẳng vào điện thoại để bạn lấy ảnh nhanh chóng."
    ],
    faqs: [
      {
        question: "Canon EOS R50 có khó dùng đối với người chưa từng cầm máy ảnh không?",
        answer: "Hoàn toàn không. Canon R50 được thiết kế thân thiện với người mới. Giao diện cảm ứng trực quan giống điện thoại thông minh, kèm chế độ Hướng dẫn sáng tạo (Creative Assist) giúp bạn chỉnh độ sáng, độ mờ nền bằng thao tác chạm gạt."
      },
      {
        question: "Thuê Canon R50 tại Kiho đã có ống kính kèm theo chưa?",
        answer: "Bộ thuê Canon R50 tại Kiho Camera đã bao gồm sẵn thân máy và ống kính zoom Canon RF-S 18-45mm IS STM có chống rung quang học, kèm 2 pin, sạc, thẻ nhớ, túi chống sốc và đầu đọc thẻ OTG."
      },
      {
        question: "Đi Quảng Bình 1 ngày nên thuê Canon R50 theo buổi hay theo ngày?",
        answer: "Nếu bạn chỉ đi dạo chụp cafe hoặc tắm biển chiều trong 4–5 tiếng, thuê 1 buổi sẽ rất kinh tế. Nếu bạn có lịch trình đi Phong Nha, suối Moọc từ sáng tới chiều tối, thuê trọn vẹn 1 ngày (24 giờ) sẽ giúp bạn thoải mái chụp mà không lo bị gấp gáp thời gian trả máy."
      },
      {
        question: "Canon R50 hay Canon G7 X Mark III phù hợp hơn cho chuyến du lịch?",
        answer: "Nếu bạn ưu tiên chất lượng ảnh cảm biến APS-C lớn, khả năng bắt nét mắt chuyển động và thay đổi được ống kính thì Canon R50 là lựa chọn thích hợp. Nếu bạn ưu tiên máy siêu nhỏ gọn đút vừa túi xách thì G7 X Mark III sẽ tiện lợi hơn."
      }
    ]
  },

  // 08. CANON M3
  "canon-m3": {
    slug: "canon-m3",
    modelName: "Canon EOS M3",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon EOS M3 tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh Canon EOS M3 tại Đồng Hới, Quảng Bình. Cảm biến APS-C 24.2MP, báng cầm đầm tay, màn hình lật selfie, giá thuê tiết kiệm.",
    tagline: "Chiếc máy ảnh mirrorless đầm tay, bền bỉ và mức chi phí thuê tiết kiệm.",
    intro: "Canon EOS M3 mang lại cảm giác cầm nắm chắc chắn nhờ báng tay cầm sâu và hệ thống vòng xoay chỉnh thông số vật lý rõ ràng. Được trang bị cảm biến APS-C 24.2MP và màn hình lật 180 độ, EOS M3 là sự lựa chọn hợp lý cho các bạn học sinh, sinh viên hoặc du khách cần một chiếc máy ảnh chụp đẹp, giá thuê tiết kiệm cho chuyến đi khám phá Đồng Hới.",
    whoIsItFor: [
      "Học sinh, sinh viên cần thuê máy ảnh với chi phí tiết kiệm nhưng chất lượng ảnh vẫn đảm bảo sắc nét.",
      "Người thích cảm giác cầm máy đầm tay, có báng nắm sâu và các nút xoay cơ học.",
      "Khách du lịch chụp ảnh gia đình, bạn bè trong các chuyến tham quan ngắn ngày.",
      "Người mới muốn tập làm quen với các thao tác nhiếp ảnh cơ bản trước khi nâng cấp lên dòng máy cao cấp."
    ],
    recommendedScenes: [
      {
        title: "Dạo chơi công viên & bờ sông",
        location: "Sông Nhật Lệ & Tượng đài Mẹ Suốt",
        description: "Màu ảnh Canon chân thực, ấm áp ghi lại những nụ cười rạng rỡ của bạn bè."
      },
      {
        title: "Chụp ảnh phong cảnh & Đời thường",
        location: "Làng chài Bảo Ninh & chợ cá Đồng Hới",
        description: "Cảm biến APS-C tái hiện chi tiết sắc nét và độ tương phản tự nhiên của cuộc sống địa phương."
      },
      {
        title: "Buổi dã ngoại ngắn ngày",
        location: "Bãi biển Quang Phú & rừng phi lao",
        description: "Thiết kế nhỏ gọn dễ dàng mang theo trong balo mà không tốn diện tích."
      }
    ],
    whyRentThis: [
      "Cảm biến APS-C 24.2 Megapixel: Đảm bảo độ phân giải cao và chi tiết hình ảnh rõ ràng.",
      "Báng cầm công thái học chắc chắn: Giúp việc cầm máy khi đi bộ đường dài trở nên an tâm và không bị trượt tay.",
      "Mức giá thuê rất kinh tế: Phù hợp với mọi ngân sách du lịch mà vẫn có ảnh chất lượng vượt trội so với điện thoại."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn máy nhỏ gọn hơn và giao diện cảm ứng hiện đại màu trắng",
        targetCameraName: "Canon M100",
        targetCameraSlug: "canon-m100",
        reason: "Canon M100 có thân máy siêu nhẹ màu trắng và lấy nét Dual Pixel nhanh hơn."
      },
      {
        condition: "Cần khả năng nhận diện người/mắt nhanh nhẹn và quay video 4K thế hệ mới",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 là thế hệ mới hơn với chip DIGIC X và hệ thống lấy nét Dual Pixel CMOS AF II."
      },
      {
        condition: "Cần mức giá thuê thấp nhất có thể cho một buổi dạo chơi ngắn",
        targetCameraName: "Canon EOS M",
        targetCameraSlug: "canon-m",
        reason: "Canon EOS M nguyên bản có mức giá thuê tối ưu nhất trong hệ máy mirrorless."
      }
    ],
    experienceTips: [
      "Màn hình của M3 có thể lật lên 180 độ để chụp selfie và lật xuống 45 độ để chụp góc cao qua đầu đám đông.",
      "Khi chụp ngoài trời nắng, bạn có thể xoay vòng bù trừ sáng trên đỉnh máy sang nấc +0.3 hoặc +0.7 để khung hình luôn đủ sáng và rõ nét.",
      "Đừng quên mang theo đầu đọc thẻ OTG đi kèm trong túi máy để lấy ảnh sang điện thoại ngay trong chuyến đi nhé."
    ],
    faqs: [
      {
        question: "Canon EOS M3 khác gì so với Canon M100?",
        answer: "Canon M3 có báng tay cầm nhô cao đầm tay hơn và nhiều vòng xoay cơ học hơn, phù hợp cho ai thích cảm giác cầm máy truyền thống. Trong khi đó Canon M100 có thiết kế phẳng mỏng nhẹ hơn và hệ thống lấy nét Dual Pixel nhanh hơn."
      },
      {
        question: "Thuê Canon M3 tại Kiho có được hướng dẫn cách sử dụng không?",
        answer: "Chắc chắn rồi. Khi bạn nhận máy tại cửa hàng hoặc nhận giao máy tại khách sạn, nhân viên Kiho sẽ hướng dẫn bạn các thao tác cơ bản và mẹo chụp đẹp chỉ trong 5 phút."
      },
      {
        question: "Canon M3 có chụp ban đêm tốt không?",
        answer: "Canon M3 trang bị cảm biến APS-C thu sáng tốt và có tích hợp đèn flash pop-up. Khi chụp buổi tối tại quán cafe hay dạo phố, bạn có thể bật nhẹ đèn flash để tạo điểm nhấn cho khuôn mặt."
      }
    ]
  },

  // 09. SONY ZV-1 MARK II
  "sony-zv1-mark-ii": {
    slug: "sony-zv1-mark-ii",
    modelName: "Sony ZV-1 Mark II",
    brand: "Sony",
    seoTitle: "Thuê máy ảnh vlog Sony ZV-1 Mark II tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy quay vlog Sony ZV-1 Mark II góc siêu rộng 18-50mm tại Đồng Hới, Quảng Bình. Âm thanh rõ nét, màn hình xoay lật, quay 4K sắc nét.",
    tagline: "Chiếc máy quay vlog nhỏ gọn với góc rộng 18mm và micro 3 capsule kèm windscreen.",
    intro: "Sony ZV-1 Mark II (ZV-1 II) là chiếc máy quay nhỏ gọn được thiết kế tối ưu cho trải nghiệm làm vlog du lịch. Điểm nâng cấp nổi bật là ống kính góc siêu rộng 18-50mm f/1.8-4.0, cho phép bạn tự quay video một mình hoặc cùng nhóm bạn ở cự ly cầm tay mà vẫn lấy trọn cảnh sắc thiên nhiên của Quảng Bình mà không cần dùng thêm gậy nối dài.",
    whoIsItFor: [
      "Travel vlogger, content creator và các bạn thích quay video ngắn TikTok, YouTube Shorts, Reels.",
      "Cặp đôi hoặc nhóm bạn muốn lưu giữ chuyến đi qua những đoạn phim sống động, âm thanh rõ ràng.",
      "Khách du lịch cần chiếc máy quay siêu nhẹ chỉ 292g, thao tác bấm quay nhanh chóng.",
      "Người muốn có màu da tự nhiên khi lên hình cùng tính năng làm mờ hậu cảnh chỉ bằng một phím bấm."
    ],
    recommendedScenes: [
      {
        title: "Quay Vlog hành trình trên xe & dạo bộ",
        location: "Đường ven biển Đồng Hới & đường mòn Hồ Chí Minh",
        description: "Góc rộng 18mm bắt trọn cả khuôn mặt người nói lẫn cung đường phía sau mà không bị hẹp khung hình."
      },
      {
        title: "Bờ biển lộng gió & Thác nước",
        location: "Biển Nhật Lệ & Thác Gió - Vườn thực vật Phong Nha",
        description: "Micro 3 đầu thu định hướng kèm bông lọc gió chuyên dụng giúp giọng nói luôn rõ ràng."
      },
      {
        title: "Review ẩm thực & Khám phá địa phương",
        location: "Chợ Đồng Hới & các quán cafe địa phương",
        description: "Tính năng Product Showcase tự động chuyển nét mượt mà từ gương mặt sang món ăn nhanh chóng."
      }
    ],
    whyRentThis: [
      "Ống kính góc siêu rộng 18-50mm: Góc 18mm thích hợp cho việc cầm tay tự quay vlog du lịch.",
      "Micro 3 đầu thu định hướng thông minh: Nhận diện hướng nguồn âm thanh kết hợp bông lọc gió hỗ trợ giảm tiếng gió ngoài trời.",
      "Chế độ Cinematic Vlog Setting: Cung cấp tỉ lệ khung hình 2.35:1 và các tùy chọn phong cách hình ảnh Creative Look."
    ],
    whenToConsiderOthers: [
      {
        condition: "Cần ống kính zoom xa hơn (đến 100mm) để chụp chân dung xóa phông và chụp phong cảnh",
        targetCameraName: "Canon G7 X Mark III",
        targetCameraSlug: "canon-g7x-mark-iii",
        reason: "Canon G7 X Mark III có dải zoom dài hơn 24-100mm và tông màu da ấm áp của Canon."
      },
      {
        condition: "Ưu tiên máy ảnh ống kính rời chuyên nghiệp để chụp ảnh tĩnh",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 trang bị cảm biến APS-C lớn hơn và khả năng thay đổi linh hoạt các ống kính chuyên dụng."
      },
      {
        condition: "Cần một lựa chọn quay video góc rộng với chi phí thuê tiết kiệm hơn",
        targetCameraName: "Sony ZV-1F",
        targetCameraSlug: "sony-zv1f",
        reason: "Sony ZV-1F có mức giá thuê mềm hơn với ống kính cố định 20mm chuyên cho video dọc."
      }
    ],
    experienceTips: [
      "Hãy luôn gắn chiếc bông lọc gió (deadcat) đi kèm vào hotshoe trên đỉnh máy khi quay ngoài trời biển hoặc đi cano để âm thanh rõ ràng hơn.",
      "Nút Bokeh Switch ở góc trên thân máy cho phép bạn chuyển đổi tức thì giữa chế độ phông nền mờ và phông nền rõ nét.",
      "Tụi mình luôn chuẩn bị sẵn cáp sạc và 2 pin để bạn sử dụng trong suốt chuyến đi."
    ],
    faqs: [
      {
        question: "Sony ZV-1 Mark II có góc quay rộng hơn ZV-1 đời đầu như thế nào?",
        answer: "ZV-1 Mark II sở hữu ống kính góc rộng bắt đầu từ 18mm (so với 24mm của thế hệ trước). Góc nhìn rộng hơn giúp bạn dễ dàng tự quay bản thân cùng nhóm bạn mà cánh tay không bị mỏi."
      },
      {
        question: "Máy Sony ZV-1 II chụp ảnh tĩnh có đẹp không hay chỉ chuyên quay phim?",
        answer: "Mặc dù được tối ưu cho video, ZV-1 II vẫn sở hữu cảm biến 1.0-inch 20.1MP sắc nét và thuật toán xử lý màu da của Sony, cho ra những bức ảnh chụp tĩnh du lịch chi tiết và màu sắc tự nhiên."
      },
      {
        question: "Khi thuê ZV-1 II tại Kiho có được kèm đầu đọc thẻ để lấy video vào điện thoại không?",
        answer: "Có. Bộ thuê luôn kèm đầu đọc thẻ OTG cắm trực tiếp vào điện thoại để chuyển video và hình ảnh nhanh chóng."
      }
    ]
  },

  // 10. SONY ZV-1F
  "sony-zv1f": {
    slug: "sony-zv1f",
    modelName: "Sony ZV-1F",
    brand: "Sony",
    seoTitle: "Thuê máy ảnh Sony ZV-1F tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy quay vlog Sony ZV-1F màu trắng tại Đồng Hới, Quảng Bình. Ống kính góc rộng 20mm f/2.0, tối ưu video ngắn TikTok & Reels.",
    tagline: "Chiếc máy quay màu trắng nhỏ xinh, góc rộng 20mm phù hợp cho video ngắn TikTok và Reels.",
    intro: "Sony ZV-1F sở hữu thiết kế màu trắng trang nhã và trọng lượng siêu nhẹ chỉ 256g. Với ống kính góc rộng cố định 20mm f/2.0 và giao diện cảm ứng trực quan, chiếc máy này là công cụ phù hợp cho các bạn trẻ muốn quay video ngắn TikTok, Instagram Reels khi đi du lịch mà không cần thao tác cài đặt phức tạp.",
    whoIsItFor: [
      "Các bạn trẻ sáng tạo nội dung trên TikTok, Reels, Shorts cần một chiếc máy nhỏ gọn và lên màu da đẹp.",
      "Khách du lịch muốn một thiết bị quay video sắc nét hơn điện thoại nhưng cực kỳ gọn nhẹ.",
      "Những bạn yêu thích thiết kế máy ảnh màu trắng hiện đại, thời trang.",
      "Người tìm kiếm chiếc máy quay vlog thương hiệu Sony chất lượng với chi phí thuê dễ tiếp cận."
    ],
    recommendedScenes: [
      {
        title: "Quay video nhảy & Bắt trend TikTok",
        location: "Khuôn viên resort & Quảng trường Đồng Hới",
        description: "Góc rộng 20mm lấy trọn vẹn toàn thân và cảnh quan xung quanh mà không cần lùi quá xa."
      },
      {
        title: "Dạo biển & Thưởng thức hải sản",
        location: "Bờ biển Nhật Lệ & làng chài Bảo Ninh",
        description: "Bông lọc gió chuyên dụng giúp thu giọng nói rõ ràng giữa tiếng gió biển."
      },
      {
        title: "Vlog một ngày khám phá Quảng Bình",
        location: "Các quán cafe & điểm check-in trong phố",
        description: "Màn hình xoay lật cảm ứng giúp bạn dễ dàng tự quay các thước phim ngắn hàng ngày."
      }
    ],
    whyRentThis: [
      "Ống kính góc cố định 20mm f/2.0: Góc nhìn tự nhiên, khẩu độ lớn cho khả năng thu sáng tốt và xóa mờ nhẹ hậu cảnh.",
      "Trọng lượng siêu nhẹ chỉ 256g: Gọn gàng khi cầm tay quay video trong thời gian dài.",
      "Tối ưu cho video khung dọc: Giao diện chuyển đổi khung hình quay đứng nhanh chóng và trực quan."
    ],
    whenToConsiderOthers: [
      {
        condition: "Cần ống kính zoom quang học để thay đổi cự ly linh hoạt và mic thu âm 3 hướng thông minh",
        targetCameraName: "Sony ZV-1 Mark II",
        targetCameraSlug: "sony-zv1-mark-ii",
        reason: "Sony ZV-1 II có ống kính zoom 18-50mm và hệ thống micro thu âm cao cấp hơn."
      },
      {
        condition: "Ưu tiên chụp ảnh chân dung xóa phông với màu da sáng của Canon",
        targetCameraName: "Canon M100",
        targetCameraSlug: "canon-m100",
        reason: "Canon M100 sử dụng cảm biến APS-C lớn hơn và ống kính zoom quang học rời."
      },
      {
        condition: "Muốn chiếc máy ảnh toàn năng vừa chụp ảnh xuất sắc vừa quay 4K chuyên nghiệp",
        targetCameraName: "Canon EOS R50",
        targetCameraSlug: "canon-eos-r50",
        reason: "Canon R50 trang bị hệ thống lấy nét Dual Pixel II và cảm biến ảnh APS-C lớn hơn."
      }
    ],
    experienceTips: [
      "Nút Bokeh Switch trên đỉnh máy sẽ giúp bạn làm mờ hậu cảnh phía sau chỉ với một cú chạm.",
      "Khi quay ngoài trời, bạn hãy bật chế độ chống rung để video giữ được độ ổn định khi di chuyển.",
      "Tụi mình luôn chuẩn bị sẵn túi đựng và đầu đọc thẻ nhớ để bạn cắm sang điện thoại chỉnh clip đăng ngay."
    ],
    faqs: [
      {
        question: "Sony ZV-1F có thể zoom ống kính lại gần được không?",
        answer: "Sony ZV-1F trang bị ống kính góc cố định 20mm f/2.0 (không có zoom quang học vật lý), giúp máy đạt độ mỏng nhẹ tối đa và khẩu độ lớn. Tuy nhiên, máy có tính năng zoom kỹ thuật số Clear Image Zoom mượt mà ngay trên màn hình cảm ứng khi cần."
      },
      {
        question: "ZV-1F có thích hợp để chụp ảnh không hay chỉ để quay video?",
        answer: "ZV-1F chụp ảnh tĩnh rất đẹp nhờ cảm biến 20.1MP sắc nét và công nghệ nhận diện màu da của Sony. Máy rất hợp cho các bức ảnh chụp dạo phố góc rộng, ảnh nhóm bạn bè và check-in cafe."
      },
      {
        question: "Bộ thuê Sony ZV-1F tại Kiho Camera có kèm bông lọc gió không?",
        answer: "Có. Trọn bộ thuê Sony ZV-1F luôn có sẵn bông lọc gió gắn trên thân máy, 2 pin, sạc, thẻ nhớ và túi chống sốc."
      }
    ]
  },

  // 11. CANON EOS M
  "canon-m": {
    slug: "canon-m",
    modelName: "Canon EOS M",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh Canon EOS M tại Quảng Bình, Đồng Hới",
    seoDescription: "Dịch vụ cho thuê máy ảnh Canon EOS M tại Đồng Hới, Quảng Bình. Cảm biến APS-C 18MP, thân kim loại đầm chắc, giá thuê siêu tiết kiệm.",
    tagline: "Chiếc máy ảnh mirrorless kim loại nguyên khối cổ điển với chi phí thuê tiết kiệm nhất.",
    intro: "Canon EOS M là chiếc máy ảnh không gương lật nguyên bản của Canon với thân máy bằng hợp kim nguyên khối đầm tay, cảm biến APS-C 18.0MP và màu sắc chân thực. EOS M là lựa chọn hợp lý cho các bạn học sinh, sinh viên muốn trải nghiệm chất lượng ảnh máy cơ với ngân sách thuê tiết kiệm nhất tại Đồng Hới.",
    whoIsItFor: [
      "Học sinh, sinh viên hoặc du khách có ngân sách tiết kiệm nhưng muốn ảnh đẹp hơn điện thoại.",
      "Người yêu thích cảm giác cầm máy kim loại đầm tay và chắc chắn.",
      "Những ai cần một chiếc máy ảnh dự phòng hoặc máy phụ trong chuyến đi khám phá Quảng Bình.",
      "Người mới bắt đầu tìm hiểu về nhiếp ảnh và các nguyên lý chụp hình cơ bản."
    ],
    recommendedScenes: [
      {
        title: "Dạo chơi & Chụp ảnh kỷ niệm cuối tuần",
        location: "Khu vực sông Nhật Lệ & Quảng trường Hồ Chí Minh",
        description: "Màu ảnh Canon chân thực, ấm áp ghi lại những nụ cười rạng rỡ của bạn bè."
      },
      {
        title: "Chụp ảnh phong cảnh & Đời thường",
        location: "Làng chài Bảo Ninh & chợ cá Đồng Hới",
        description: "Cảm biến APS-C tái hiện chi tiết sắc nét và độ tương phản tự nhiên của cuộc sống địa phương."
      },
      {
        title: "Buổi dã ngoại ngắn ngày",
        location: "Bãi biển Quang Phú & rừng phi lao",
        description: "Thiết kế nhỏ gọn dễ dàng mang theo trong balo mà không tốn diện tích."
      }
    ],
    whyRentThis: [
      "Chi phí thuê thấp nhất phân khúc: Giúp bạn thoải mái trải nghiệm máy ảnh chuyên dụng mà không lo về giá.",
      "Cảm biến APS-C 18.0MP: Kích thước cảm biến lớn hơn so với điện thoại thông thường, cho chất lượng ảnh sạch và trong trẻo.",
      "Thân máy kim loại nguyên khối: Bền bỉ, đầm chắc và mang nét thẩm mỹ hoài cổ độc đáo."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn màn hình lật 180 độ để chụp selfie và lấy nét nhanh hơn",
        targetCameraName: "Canon M100",
        targetCameraSlug: "canon-m100",
        reason: "Canon M100 có màn hình lật chuyên selfie và hệ thống lấy nét Dual Pixel nhanh nhạy hơn."
      },
      {
        condition: "Cần máy có báng cầm tay sâu hơn và độ phân giải cao 24MP",
        targetCameraName: "Canon M3",
        targetCameraSlug: "canon-m3",
        reason: "Canon M3 có báng cầm nhô cao đầm tay và độ phân giải 24.2MP."
      },
      {
        condition: "Muốn hiệu ứng chụp flash đêm mang phong cách Y2K nhỏ gọn",
        targetCameraName: "Canon IXY 640",
        targetCameraSlug: "canon-ixy-640",
        reason: "Canon IXY 640 là dòng máy digicam mini chuyên tạo hiệu ứng flash vintage độc lạ."
      }
    ],
    experienceTips: [
      "Thân máy EOS M bằng kim loại mát tay, bạn hãy kết hợp cùng ống kính pancake nhỏ gọn để có một bộ máy cơ động tuyệt đối.",
      "Màn hình cảm ứng Clear View II của máy rất nhạy, bạn có thể chạm trực tiếp vào điểm muốn chụp để máy lấy nét.",
      "Tụi mình luôn chuẩn bị đầy đủ 2 pin sạc, thẻ nhớ và đầu đọc OTG để bạn sử dụng thuận tiện nhất."
    ],
    faqs: [
      {
        question: "Canon EOS M có thay đổi được ống kính không?",
        answer: "Có. Canon EOS M là dòng máy mirrorless sử dụng ngàm EF-M, cho phép bạn thay đổi linh hoạt giữa các loại ống kính zoom, ống kính góc rộng hoặc ống kính fix xóa phông."
      },
      {
        question: "Máy Canon EOS M có phù hợp cho chuyến đi 1 ngày tại Đồng Hới không?",
        answer: "Rất phù hợp. Với chi phí thuê siêu tiết kiệm và chất lượng cảm biến APS-C lớn, EOS M đáp ứng trọn vẹn nhu cầu chụp ảnh kỷ niệm dạo phố, ngắm biển của bạn."
      },
      {
        question: "Lấy ảnh từ Canon EOS M sang điện thoại như thế nào?",
        answer: "Bạn chỉ cần rút thẻ nhớ cắm vào đầu đọc thẻ OTG do Kiho chuẩn bị sẵn trong túi máy và cắm trực tiếp vào điện thoại, toàn bộ ảnh sẽ được chuyển sang nhanh chóng."
      }
    ]
  },

  // 12. CANON IXY 640
  "canon-ixy-640": {
    slug: "canon-ixy-640",
    modelName: "Canon IXY 640",
    brand: "Canon",
    seoTitle: "Thuê máy ảnh compact Canon IXY 640 tại Quảng Bình, Đồng Hới",
    seoDescription: "Cho thuê máy ảnh kỹ thuật số cổ điển Canon IXY 640 tại Đồng Hới, Quảng Bình. Đèn flash đêm vibe Y2K hoài niệm, máy mini bỏ túi áo.",
    tagline: "Chiếc digicam mini cổ điển, đèn flash đêm nghệ thuật và trọn vẹn phong cách hoài niệm Y2K.",
    intro: "Canon IXY 640 mang đến trải nghiệm chụp ảnh kỹ thuật số cổ điển (digicam) được nhiều bạn trẻ yêu thích. Thân máy mỏng nhẹ chỉ 147g bỏ gọn trong túi áo, zoom quang học 12x và cụm đèn flash tích hợp đánh sáng tạo hạt noise retro đặc trưng, biến mỗi bức ảnh đêm dạo phố Đồng Hới hay tiệc sinh nhật thành một thước phim kỷ niệm đậm chất vintage.",
    whoIsItFor: [
      "Những bạn trẻ yêu thích trào lưu ảnh Y2K, phong cách retro thập niên 2000s với ánh flash đêm độc lạ.",
      "Người đi cafe, hẹn hò buổi tối, đi tiệc sinh nhật, bar/pub hoặc dạo phố đêm Đồng Hới.",
      "Các bạn nữ muốn một chiếc máy ảnh mini siêu nhỏ gọn, thời trang và bỏ vừa mọi chiếc túi xách nhỏ.",
      "Những ai tìm kiếm trải nghiệm chụp ảnh ngẫu hứng, vui vẻ và không cầu kỳ thông số kỹ thuật."
    ],
    recommendedScenes: [
      {
        title: "Chụp Flash đêm dạo phố & Quán pub",
        location: "Khu phố đêm Đồng Hới & ven sông Nhật Lệ",
        description: "Đèn flash trực diện làm nổi bật chủ thể trên nền tối, tạo chất ảnh hoài niệm đặc trưng."
      },
      {
        title: "Tiệc sinh nhật & Hẹn hò lãng mạn",
        location: "Các quán cafe ấm cúng tại Đồng Hới",
        description: "Ghi lại những khoảnh khắc tự nhiên cùng bạn bè với tone màu vintage ấm áp."
      },
      {
        title: "Bắt trọn chi tiết từ xa",
        location: "Bờ biển & các điểm tham quan",
        description: "Ống kính zoom quang học 12x giúp bạn chụp cận cảnh các chi tiết ở xa một cách dễ dàng."
      }
    ],
    whyRentThis: [
      "Hiệu ứng ánh sáng Flash Y2K: Đèn flash đánh thẳng tạo nên vệt bóng đổ nghệ thuật và tone da retro nịnh mắt.",
      "Thiết kế siêu nhỏ gọn 147g: Mỏng nhẹ đến mức bạn có thể đút vừa trong túi áo hoặc túi xách nhỏ.",
      "Zoom quang học 12x trong thân máy tí hon: Vừa có góc rộng chụp nhóm vừa có thể zoom xa bắt trọn mọi chi tiết."
    ],
    whenToConsiderOthers: [
      {
        condition: "Muốn một chiếc máy ảnh compact hiện đại chuyên nghiệp có thể quay video 4K và màn hình lật selfie",
        targetCameraName: "Canon G7 X Mark III",
        targetCameraSlug: "canon-g7x-mark-iii",
        reason: "Canon G7 X Mark III trang bị cảm biến 1-inch cao cấp hơn và màn hình lật cảm ứng 180 độ."
      },
      {
        condition: "Thích màu ảnh film cổ điển cao cấp với hệ thống giả lập màu trứ danh của Fuji",
        targetCameraName: "Fujifilm X100V",
        targetCameraSlug: "fujifilm-x100v",
        reason: "Fujifilm X100V là dòng máy rangefinder cao cấp với các bộ lọc màu film nổi tiếng."
      },
      {
        condition: "Muốn máy ảnh ống kính rời để chụp chân dung xóa phông rõ nét",
        targetCameraName: "Canon M100",
        targetCameraSlug: "canon-m100",
        reason: "Canon M100 có cảm biến APS-C lớn hơn và khả năng thay đổi ống kính xóa phông mịn màng."
      }
    ],
    experienceTips: [
      "Bí quyết để có ảnh vibe Y2K đẹp nhất với IXY 640 là bật chế độ Flash On khi chụp trong nhà hoặc buổi tối.",
      "Đứng cách chủ thể khoảng 1 đến 2 mét khi chụp flash để ánh sáng phủ đều gương mặt mà không bị quá chói.",
      "Tụi mình luôn chuẩn bị sẵn bao da mini vintage, dây đeo tay và đầu đọc thẻ nhớ OTG để bạn lấy ảnh check-in nhanh chóng."
    ],
    faqs: [
      {
        question: "Canon IXY 640 chụp ảnh có giống điện thoại không?",
        answer: "Khác biệt rõ rệt. Ảnh từ IXY 640 mang chất ảnh kỹ thuật số đầu những năm 2000 với độ tương phản đặc trưng của đèn flash trực diện và hạt grain mịn cổ điển — tạo cảm xúc hoài niệm rất riêng."
      },
      {
        question: "Máy Canon IXY 640 có dễ sử dụng cho người chưa biết chụp ảnh không?",
        answer: "Cực kỳ dễ. Bạn chỉ cần bật nguồn máy, căn khung hình và bấm nút chụp. Máy sẽ tự động lấy nét và kích hoạt đèn flash thông minh."
      },
      {
        question: "Bộ thuê máy ảnh Canon IXY 640 tại Kiho gồm những gì?",
        answer: "Bộ thuê máy IXY 640 tại Kiho gồm: thân máy Canon IXY 640 màu bạc, 2 pin, sạc, thẻ nhớ, bao da mini vintage, dây đeo tay và đầu đọc thẻ OTG cho điện thoại."
      }
    ]
  }

};

export function getCameraSeoContent(slug: string): CameraSeoContent | null {
  return CAMERA_SEO_CONTENT[slug] || null;
}

