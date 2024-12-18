BEGIN;

TRUNCATE "Commodity", "Invoice", "Order", "OrderElement", "Restock", "Session", "StockDispatch", "User", "VerificationToken", "WeightToLenghtRatio";

INSERT INTO "User" ("id", "email", "name", "role", "password", "emailVerified", "image") VALUES
('dae9d65e-eb3b-4a60-a606-755013e7c299',	'peta.kabourek@seznam.cz',	'Petr Kabourek',	'',	'$2a$10$B4U3W6BHTqSjtibCRJqf/eWWfz7h5W6DFKEjmD8DPhXfks7XCOnXe',	NULL,	NULL),
('',	'silverhand@seznam.cz',	'John Silverhand',	'ADMIN',	'$2a$10$B4U3W6BHTqSjtibCRJqf/eWWfz7h5W6DFKEjmD8DPhXfks7XCOnXe',	NULL,	NULL);


INSERT INTO "Commodity" ("name", "unit") VALUES
('Welded mesh 6/100x100',	'PIECE'),
('Welded mesh 8/100x100',	'PIECE'),
('Welded mesh 6/150x150',	'PIECE'),
('Wire R30',	'KG'),
('Wire R8',	'KG'),
('Wire R22',	'KG'),
('Coil R6',	'MM'),
('Coil R8',	'MM'),
('Wire R16 ',	'KG');

INSERT INTO "Order" ("id", "date", "authorId", "note") VALUES
(1,	'2024-12-13 12:46:06.516',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Stavba Pruhonice'),
(3,	'2024-12-13 14:19:14.729',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Jihlava stavby'),
(6,	'2024-12-15 14:24:21.091',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Order c. 2'),
(7,	'2024-12-15 14:24:37.392',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'OHLA ZS - weld meshes'),
(2,	'2024-12-13 12:47:39.563',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'OHLA ZS - Nove Sady'),
(5,	'2024-12-15 14:23:45.39',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'izomat'),
(9,	'2024-12-15 16:19:44.032',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Izomat restock'),
(4,	'2024-12-15 14:23:28.274',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Praha stavebniny - houses Praha 6'),
(10,	'2024-12-15 19:32:05.017',	'',	'SPS, a. s.'),
(11,	'2024-12-15 21:42:14.787',	'',	'Metrostav'),
(12,	'2024-12-17 23:22:41.853',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Metrostav tunnels'),
(13,	'2024-12-17 23:31:44.287',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Metrostav apartments'),
(8,	'2024-12-11 14:24:37.392',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Izomat wires'),
(14,	'2024-12-17 23:43:45.36',	'dae9d65e-eb3b-4a60-a606-755013e7c299',	'Meterial certifications');

INSERT INTO "OrderElement" ("id", "orderId", "commodityId", "processingNote", "processingType", "unitLength", "numberOfUnits", "unitPrice", "ticketNumber") VALUES
(7,	6,	'Wire R22',	'delayed',	'STRAIGHT',	21.000000000000000000000000000000,	444.000000000000000000000000000000,	42.000000000000000000000000000000,	NULL),
(6,	6,	'Welded mesh 6/100x100',	'separate packaging',	'STRAIGHT',	2.000000000000000000000000000000,	32.000000000000000000000000000000,	120.000000000000000000000000000000,	NULL),
(5,	5,	'Wire R22',	'',	'STRAIGHT',	1.000000000000000000000000000000,	3.000000000000000000000000000000,	2.000000000000000000000000000000,	NULL),
(18,	8,	'Welded mesh 6/100x100',	'certification',	'STRAIGHT',	1.000000000000000000000000000000,	1.000000000000000000000000000000,	200.000000000000000000000000000000,	NULL),
(19,	8,	'Welded mesh 8/100x100',	'certification',	'STRAIGHT',	1.000000000000000000000000000000,	1.000000000000000000000000000000,	250.000000000000000000000000000000,	NULL),
(20,	8,	'Welded mesh 6/150x150',	'certification',	'STRAIGHT',	1.000000000000000000000000000000,	1.000000000000000000000000000000,	300.000000000000000000000000000000,	NULL),
(21,	8,	'Wire R30',	'certification',	'STRAIGHT',	1.000000000000000000000000000000,	1.000000000000000000000000000000,	50.000000000000000000000000000000,	NULL),
(22,	14,	'Wire R16 ',	'certification',	'STRAIGHT',	1.000000000000000000000000000000,	55.000000000000000000000000000000,	1.000000000000000000000000000000,	NULL),
(3,	3,	'Welded mesh 6/100x100',	'',	'STRAIGHT',	10.000000000000000000000000000000,	13.000000000000000000000000000000,	11.000000000000000000000000000000,	NULL),
(12,	11,	'Welded mesh 6/100x100',	'',	'STRAIGHT',	1.000000000000000000000000000000,	324.000000000000000000000000000000,	100.000000000000000000000000000000,	NULL),
(9,	9,	'Wire R22',	'',	'STRAIGHT',	1.000000000000000000000000000000,	1.000000000000000000000000000000,	1.000000000000000000000000000000,	NULL),
(11,	11,	'Wire R22',	'',	'STRAIGHT',	200.000000000000000000000000000000,	2.000000000000000000000000000000,	250.000000000000000000000000000000,	NULL),
(13,	12,	'Wire R8',	'',	'STRAIGHT',	1.000000000000000000000000000000,	150.000000000000000000000000000000,	88.000000000000000000000000000000,	NULL),
(14,	12,	'Wire R22',	'',	'STRAIGHT',	2.000000000000000000000000000000,	145.000000000000000000000000000000,	125.000000000000000000000000000000,	NULL),
(15,	13,	'Welded mesh 6/150x150',	'last minute change',	'STRAIGHT',	1.000000000000000000000000000000,	170.000000000000000000000000000000,	500.000000000000000000000000000000,	NULL),
(16,	13,	'Welded mesh 6/100x100',	'do not pack',	'STRAIGHT',	1.000000000000000000000000000000,	325.000000000000000000000000000000,	120.000000000000000000000000000000,	NULL),
(17,	13,	'Wire R30',	'bend at 1200x800',	'STRAIGHT',	2.000000000000000000000000000000,	35.000000000000000000000000000000,	55.000000000000000000000000000000,	NULL),
(4,	4,	'Welded mesh 6/100x100',	'TR 400x180',	'STRAIGHT',	10.000000000000000000000000000000,	22.000000000000000000000000000000,	23.000000000000000000000000000000,	NULL),
(10,	10,	'Welded mesh 6/100x100',	'last minute change',	'STRAIGHT',	1.000000000000000000000000000000,	2345.000000000000000000000000000000,	32.000000000000000000000000000000,	NULL),
(1,	1,	'Wire R22',	'bend 50 degress',	'STRAIGHT',	50.000000000000000000000000000000,	50.000000000000000000000000000000,	50.000000000000000000000000000000,	NULL),
(2,	2,	'Wire R22',	'straighten up',	'STRAIGHT',	20.000000000000000000000000000000,	23.000000000000000000000000000000,	500.000000000000000000000000000000,	NULL),
(8,	7,	'Wire R22',	'fast delivery',	'STRAIGHT',	1.000000000000000000000000000000,	100.000000000000000000000000000000,	1.000000000000000000000000000000,	NULL);

INSERT INTO "Invoice" ("invoiceNumber", "date", "orderId") VALUES
('INV-9',	'2024-12-15 16:19:46.747',	9),
('INV-5',	'2024-12-15 21:47:01.292',	5),
('INV-7',	'2024-12-15 22:08:24.581',	7),
('INV-12',	'2024-12-17 23:22:48.249',	12),
('INV-13',	'2024-12-17 23:31:52.303',	13),
('INV-14',	'2024-12-17 23:43:55.361',	14);

INSERT INTO "Restock" ("id", "date", "commodityId", "quantity", "supplierName", "invoiceNumber", "unitPrice", "authorId") VALUES
(22,	'2024-12-17 23:41:02.613',	'Wire R16 ',	14.000000000000000000000000000000,	'Annahutte',	'48548-95',	100.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(23,	'2024-12-17 23:41:58.974',	'Wire R16 ',	15.000000000000000000000000000000,	'Annahutte',	'1459-45',	50.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(24,	'2024-12-17 23:42:27.911',	'Wire R16 ',	15.000000000000000000000000000000,	'Annahutte',	'48548-44',	55.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(8,	'2024-12-16 22:48:52.221',	'Welded mesh 6/150x150',	125.000000000000000000000000000000,	'FERONA',	'2024110912',	399.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(9,	'2024-12-16 23:06:44.916',	'Wire R30',	10.000000000000000000000000000000,	'FERONA',	'2454249-96',	302.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(10,	'2024-12-16 23:07:39.076',	'Wire R30',	12.000000000000000000000000000000,	'Annahutte',	'015748-45',	320.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(21,	'2024-12-19 16:50:39.981',	'Welded mesh 8/100x100',	5.000000000000000000000000000000,	'Liberty',	'UHK6789',	490.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(20,	'2024-12-19 15:25:45.671',	'Wire R22',	500.000000000000000000000000000000,	'ROXOR',	'78965TYR',	100.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(1,	'2024-12-15 12:44:25.989',	'Wire R22',	100.000000000000000000000000000000,	'FERONA',	'2024110874',	100.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(6,	'2024-12-15 22:10:44.948',	'Welded mesh 8/100x100',	150.000000000000000000000000000000,	'FERONA',	'111147DL',	500.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(4,	'2024-12-15 21:47:54.331',	'Wire R22',	300.000000000000000000000000000000,	'Liberty',	'2024110874',	125.000000000000000000000000000000,	''),
(7,	'2024-12-15 22:13:17.812',	'Welded mesh 8/100x100',	1.000000000000000000000000000000,	'Liberty',	'1081437DK',	500.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(2,	'2024-12-15 16:20:21.248',	'Wire R22',	50.000000000000000000000000000000,	'Annahutte',	'015748-45',	250.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(5,	'2024-12-15 22:09:43.121',	'Welded mesh 6/100x100',	5.000000000000000000000000000000,	'Annahutte',	'74852-84',	200.000000000000000000000000000000,	''),
(3,	'2024-12-15 16:21:04.136',	'Welded mesh 6/100x100',	400.000000000000000000000000000000,	'Annahutte',	'47558-45',	450.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(11,	'2024-12-17 23:10:12.317',	'Wire R8',	350.000000000000000000000000000000,	'ROXOR',	'14572/95',	50.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(12,	'2024-12-18 09:15:30.101',	'Wire R8',	200.000000000000000000000000000000,	'FERONA',	'56789-ABC',	60.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(13,	'2024-12-18 09:20:45.212',	'Welded mesh 6/150x150',	50.000000000000000000000000000000,	'Liberty',	'147852369',	410.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(14,	'2024-12-18 10:30:12.567',	'Wire R30',	75.000000000000000000000000000000,	'Annahutte',	'87456321',	310.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(17,	'2024-12-18 12:30:33.889',	'Wire R8',	300.000000000000000000000000000000,	'Liberty',	'A765DS89',	55.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(18,	'2024-12-18 13:10:25.124',	'Welded mesh 6/100x100',	20.000000000000000000000000000000,	'FERONA',	'456321',	195.000000000000000000000000000000,	''),
(19,	'2024-12-18 14:05:11.567',	'Wire R30',	120.000000000000000000000000000000,	'Annahutte',	'LNK56432',	315.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(15,	'2024-12-17 23:39:32.219',	'Wire R16 ',	1.000000000000000000000000000000,	'FERONA',	'412821',	100.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299'),
(16,	'2024-12-17 23:40:20.047',	'Wire R16 ',	10.000000000000000000000000000000,	'FERON',	'15745',	200.000000000000000000000000000000,	'dae9d65e-eb3b-4a60-a606-755013e7c299');


INSERT INTO "StockDispatch" ("id", "date", "orderElementId", "quantity", "restockId") VALUES
(1,	'2024-12-15 16:19:46.735',	9,	1.000000000000000000000000000000,	1),
(2,	'2024-12-15 21:47:01.279',	5,	3.000000000000000000000000000000,	1),
(3,	'2024-12-15 22:08:24.563',	8,	4.000000000000000000000000000000,	2),
(4,	'2024-12-15 22:08:24.563',	8,	96.000000000000000000000000000000,	1),
(5,	'2024-12-17 23:22:48.239',	14,	244.000000000000000000000000000000,	4),
(6,	'2024-12-17 23:22:48.239',	14,	46.000000000000000000000000000000,	2),
(7,	'2024-12-17 23:22:48.239',	13,	150.000000000000000000000000000000,	11),
(8,	'2024-12-17 23:31:52.279',	17,	48.000000000000000000000000000000,	14),
(9,	'2024-12-17 23:31:52.279',	17,	12.000000000000000000000000000000,	10),
(10,	'2024-12-17 23:31:52.28',	15,	125.000000000000000000000000000000,	8),
(11,	'2024-12-17 23:31:52.279',	17,	10.000000000000000000000000000000,	9),
(12,	'2024-12-17 23:31:52.28',	15,	45.000000000000000000000000000000,	13),
(13,	'2024-12-17 23:31:52.28',	16,	325.000000000000000000000000000000,	3),
(14,	'2024-12-17 23:43:55.35',	22,	15.000000000000000000000000000000,	23),
(15,	'2024-12-17 23:43:55.351',	22,	1.000000000000000000000000000000,	15),
(16,	'2024-12-17 23:43:55.351',	22,	10.000000000000000000000000000000,	16),
(17,	'2024-12-17 23:43:55.35',	22,	15.000000000000000000000000000000,	24),
(18,	'2024-12-17 23:43:55.35',	22,	14.000000000000000000000000000000,	22);

ALTER SEQUENCE "Order_id_seq" RESTART WITH 15;
ALTER SEQUENCE "OrderElement_id_seq" RESTART WITH 23;
ALTER SEQUENCE "Restock_id_seq" RESTART WITH 25;
ALTER SEQUENCE "StockDispatch_id_seq" RESTART WITH 19;

COMMIT;
