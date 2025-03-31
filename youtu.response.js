let body = $response.body;
let obj = JSON.parse(body);

// Xử lý quảng cáo, PiP, background play (giữ nguyên logic gốc)
if (obj.playerResponse) {
    if (obj.playerResponse.adPlacements) {
        obj.playerResponse.adPlacements = [];
    }
    if (obj.playerResponse.playerAds) {
        obj.playerResponse.playerAds = [];
    }
    obj.playerResponse.playabilityStatus.status = "OK";
    obj.playerResponse.backgroundability = { backgroundable: true }; // Phát trong nền
}

// Thêm tính năng tải video ngoại tuyến
const args = JSON.parse($argument || '{}');
if (args.enableOffline === true) {
    if (obj.playerResponse) {
        obj.playerResponse.offlineability = {
            offlineable: true, // Cho phép tải video
            reason: "" // Xóa lý do chặn tải (nếu có)
        };
    }
    if (obj.offlineability) {
        obj.offlineability.offlineable = true;
    }
}

// Xử lý các endpoint khác
if (obj.response) {
    obj.response.isPremium = true; // Giả lập Premium
}

$done({ body: JSON.stringify(obj) });
