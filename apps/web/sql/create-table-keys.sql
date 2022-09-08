CREATE TABLE `keys` (
	`kid` varchar(26) NOT NULL,
	`privateKey` varchar(4096),
	`publicKey` varchar(4096) NOT NULL,
	PRIMARY KEY (`kid`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;