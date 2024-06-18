
CREATE PROCEDURE [dbo].[Playwright_ReleaseUser] (@UserName VARCHAR(100))
AS
BEGIN
	BEGIN TRANSACTION ReleaseUser
		UPDATE [qa_pw_user_account] SET data_status='Available' WHERE pw_user_name=@UserName
	COMMIT TRANSACTION
END
GO


