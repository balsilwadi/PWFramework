
CREATE PROCEDURE [dbo].[Playwright_GetNextUser]
AS
BEGIN
	DECLARE @DataId INT = 0
	BEGIN TRANSACTION GetNextUser
		SELECT TOP 1 @DataId = data_id FROM [qa_pw_user_account] WHERE data_status <> 'Processing'
		IF @DataId <> 0
		BEGIN
			UPDATE [qa_pw_user_account] SET data_status='Processing' WHERE data_id=@DataId
		END
	COMMIT TRANSACTION
	IF @DataId <> 0
	BEGIN
		SELECT [pw_user_name] FROM [qa_pw_user_account] WHERE  data_id=@DataId
	END
	ELSE
	BEGIN
		SELECT NULL [pw_user_name]
	END
END
GO


