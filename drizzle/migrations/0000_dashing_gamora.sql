CREATE TABLE `imageCompositionTemplate` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`example` text NOT NULL,
	`params` text,
	`schema` text,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `multiTransformationConfig` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`config` text,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `multiTransformationJob` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`configId` integer,
	`statusDetails` text DEFAULT '{}' NOT NULL,
	`status` text NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`configId`) REFERENCES `multiTransformationConfig`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `multiTransformationJob_createdat_idx` ON `multiTransformationJob` (`timestamp1`);--> statement-breakpoint
CREATE INDEX `multiTransformationJob_userId_idx` ON `multiTransformationJob` (`userId`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shopifyCustomerId` text,
	`firstName` text,
	`lastName` text,
	`email` text,
	`password` text,
	`role` text DEFAULT 'guest',
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_shopifyCustomerId_idx` ON `user` (`shopifyCustomerId`);--> statement-breakpoint
CREATE TABLE `userImage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`filesize` integer NOT NULL,
	`origin` text,
	`category` text,
	`userId` integer,
	`provider` text NOT NULL,
	`uid` text NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userImage_uid_idx` ON `userImage` (`uid`);--> statement-breakpoint
CREATE INDEX `userImage_userId_idx` ON `userImage` (`userId`);--> statement-breakpoint
CREATE TABLE `userImageComposition` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`templateId` integer,
	`thumbnail` text,
	`image` text,
	`params` text DEFAULT '{}' NOT NULL,
	`configuration` text DEFAULT '{}' NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`templateId`) REFERENCES `imageCompositionTemplate`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `userImageComposition_userId_idx` ON `userImageComposition` (`userId`);--> statement-breakpoint
CREATE TABLE `vanceConfig` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`params` text DEFAULT '{}',
	`config` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vanceTransformation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`transId` text NOT NULL,
	`name` text NOT NULL,
	`status` text NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vanceTransformation_transId_idx` ON `vanceTransformation` (`transId`);--> statement-breakpoint
CREATE INDEX `vanceTransformation_createdat_idx` ON `vanceTransformation` (`timestamp1`);--> statement-breakpoint
CREATE TABLE `vanceUpload` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`filesize` integer NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `VanceUpload_uid_idx` ON `vanceUpload` (`uid`);--> statement-breakpoint
CREATE INDEX `VanceUpload_createdat_idx` ON `vanceUpload` (`timestamp1`);