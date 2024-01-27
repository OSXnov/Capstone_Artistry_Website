# Import the MySQLCmdlets module
Import-Module -Name MySQLCmdlets

# Connect to the MySQL server
$mysql = Connect-MySqlServer -Server "localhost" -Database "artistry" -User "root" -Password "STT_ArtistryUserReg_2023"

# Execute a query to get the user name and email
$user = Invoke-MySQL -Connection $mysql -Query "SELECT Name, Email FROM Users WHERE email = 'ema.montano10@gmail.com'"

# Read the HTML file content
$html = Get-Content -Path "/Testing_Code/UserProfilePageTEST.html" -Raw

# Replace the placeholders with the values
$html = $html.Replace('{User.Name}', $user.Name)


# Write the updated HTML file content
Set-Content -Path "/Testing_Code" -Value $html
