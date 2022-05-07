BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [uuid] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_uuid_key] UNIQUE ([uuid]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[UnverifiedUser] (
    [id] INT NOT NULL IDENTITY(1,1),
    [uuid] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UnverifiedUser_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [UnverifiedUser_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [UnverifiedUser_uuid_key] UNIQUE ([uuid]),
    CONSTRAINT [UnverifiedUser_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ownerId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [interval] NVARCHAR(1000) NOT NULL CONSTRAINT [Task_interval_df] DEFAULT 'DAILY',
    [priority] NVARCHAR(1000) NOT NULL CONSTRAINT [Task_priority_df] DEFAULT 'LOW',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Task_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Task_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [Task_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
