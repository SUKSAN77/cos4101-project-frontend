export const mockUsers = [
    {
        id: "USER001",
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        isActive: true,
        emailVerified: true,
        role: 0,
        createdAt: "2023-01-01T00:00:00.000Z",
    },
    {
        id: "USER002",
        email: "user2@example.com",
        firstName: "Jane",
        lastName: "Smith",
        isActive: true,
        emailVerified: false,
        role: 1,
        createdAt: "2023-02-15T00:00:00.000Z",
    },
    {
        id: "USER003",
        email: "user3@example.com",
        firstName: "Bob",
        lastName: "Johnson",
        isActive: false,
        emailVerified: true,
        role: 0,
        createdAt: "2023-03-20T00:00:00.000Z",
    },
];

export const mockEquipment = [
    {
        id: "001",
        name: "คอมพิวเตอร์ตั้งโต๊ะ Dell OptiPlex",
        description: "คอมพิวเตอร์ตั้งโต๊ะสำหรับสำนักงาน",
        lifetime: 5,
        price: 30000.0,
        customId: "COM001",
        serialNumber: "SN12345",
        status: 0,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-01-15T00:00:00.000Z",
        categoryId: "CAT001",
        roomId: "ROOM201",
    },
    {
        id: "002",
        name: "โปรเจคเตอร์ Epson EB-X51",
        description: "โปรเจคเตอร์สำหรับห้องประชุม",
        lifetime: 3,
        price: 25000.0,
        customId: "PRJ001",
        serialNumber: "SN67890",
        status: 1,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2022-11-20T00:00:00.000Z",
        categoryId: "CAT002",
        roomId: "ROOM101",
    },
    {
        id: "003",
        name: "เครื่องพิมพ์ HP LaserJet Pro",
        description: "เครื่องพิมพ์เลเซอร์สี",
        lifetime: 4,
        price: 15000.0,
        customId: "PRT001",
        serialNumber: "SN24680",
        status: 0,
        acquisitionMethod: "เช่า",
        acquiredDate: "2023-03-05T00:00:00.000Z",
        categoryId: "CAT003",
        roomId: "ROOM301",
    },
    {
        id: "004",
        name: "โน๊ตบุ๊ค Lenovo ThinkPad",
        description: "โน๊ตบุ๊คสำหรับงานออกแบบ",
        lifetime: 5,
        price: 45000.0,
        customId: "COM002",
        serialNumber: "SN13579",
        status: 0,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-04-10T00:00:00.000Z",
        categoryId: "CAT001",
        roomId: "ROOM201",
    },
    {
        id: "005",
        name: "จอมอนิเตอร์ Dell 27 นิ้ว",
        description: "จอมอนิเตอร์สำหรับงานกราฟิก",
        lifetime: 5,
        price: 12000.0,
        customId: "MON001",
        serialNumber: "SN97531",
        status: 0,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-02-20T00:00:00.000Z",
        categoryId: "CAT003",
        roomId: "ROOM201",
    },
    {
        id: "006",
        name: "เครื่องสแกนเนอร์ Epson",
        description: "เครื่องสแกนเอกสาร",
        lifetime: 4,
        price: 8000.0,
        customId: "SCN001",
        serialNumber: "SN86420",
        status: 1,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-05-15T00:00:00.000Z",
        categoryId: "CAT003",
        roomId: "ROOM101",
    },
    {
        id: "007",
        name: "ไมโครโฟนไร้สาย Shure",
        description: "ไมโครโฟนสำหรับห้องประชุม",
        lifetime: 3,
        price: 15000.0,
        customId: "MIC001",
        serialNumber: "SN45678",
        status: 0,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-06-01T00:00:00.000Z",
        categoryId: "CAT002",
        roomId: "ROOM101",
    },
    {
        id: "008",
        name: "เครื่องถ่ายเอกสาร Canon",
        description: "เครื่องถ่ายเอกสารระบบดิจิทัล",
        lifetime: 5,
        price: 50000.0,
        customId: "CPY001",
        serialNumber: "SN78901",
        status: 0,
        acquisitionMethod: "เช่า",
        acquiredDate: "2023-01-01T00:00:00.000Z",
        categoryId: "CAT003",
        roomId: "ROOM301",
    },
    {
        id: "009",
        name: "แท็บเล็ต iPad Pro",
        description: "แท็บเล็ตสำหรับงานนำเสนอ",
        lifetime: 3,
        price: 35000.0,
        customId: "TAB001",
        serialNumber: "SN23456",
        status: 0,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-07-10T00:00:00.000Z",
        categoryId: "CAT001",
        roomId: "ROOM201",
    },
    {
        id: "010",
        name: "กล้องวิดีโอ Sony",
        description: "กล้องวิดีโอสำหรับบันทึกการประชุม",
        lifetime: 4,
        price: 45000.0,
        customId: "CAM001",
        serialNumber: "SN34567",
        status: 2,
        acquisitionMethod: "ซื้อ",
        acquiredDate: "2023-03-15T00:00:00.000Z",
        categoryId: "CAT002",
        roomId: "ROOM101",
    },
];

export const mockRooms = [
    {
        id: "ROOM201",
        roomNumber: "201",
        createdAt: "2023-01-01T00:00:00.000Z",
    },
    {
        id: "ROOM211",
        roomNumber: "211",
        createdAt: "2023-02-15T00:00:00.000Z",
    },
    {
        id: "ROOM204",
        roomNumber: "204",
        createdAt: "2023-03-20T00:00:00.000Z",
    },
];

export const mockCategories = [
    {
        id: "CAT001",
        name: "คอมพิวเตอร์",
        createdAt: "2023-01-01T00:00:00.000Z",
    },
    {
        id: "CAT002",
        name: "อุปกรณ์นำเสนอ",
        createdAt: "2023-02-15T00:00:00.000Z",
    },
    {
        id: "CAT003",
        name: "อุปกรณ์ต่อพ่วง",
        createdAt: "2023-03-20T00:00:00.000Z",
    },
    {
        id: "CAT005",
        name: "เครื่องพิมพ์",
        createdAt: "2023-01-20T00:00:00.000Z",
    },
    {
        id: "CAT004",
        name: "โต๊ะ",
        createdAt: "2023-04-20T00:00:00.000Z",
    },
];
