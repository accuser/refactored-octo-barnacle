CREATE TABLE `accounts` (
	`id` varchar(26) NOT NULL,
	`email` varchar(254) NOT NULL,
	`displayName` varchar(254),
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;
