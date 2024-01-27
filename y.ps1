# Add MySQL assembly
Add-Type -Path "C:\Users\ricar\Documents\Artistry\Capstone_Artistry_Website\MySQLMySql.Data.dll"

# MySQL connection string
$connectionString = "Server=localhost;Port=3306;Database=artistry;Uid=root;Pwd=STT_ArtistryUserReg_2023;"
$connection = New-Object MySql.Data.MySqlClient.MySqlConnection($connectionString)

$htmlFilePath = "C:\Users\ricar\Documents\Artistry\Capstone_Artistry_Website\Testing_Code\UserProfilePageTEST.html"

try {
    # Open the MySQL connection
    $connection.Open()

    # SQL query to retrieve the username
    $query = "SELECT username FROM users WHERE email = 'ema.montano10@gmail.com';"
    $command = New-Object MySql.Data.MySqlClient.MySqlCommand($query, $connection)
    
    # Execute the query and retrieve the result
    $username = $command.ExecuteScalar()

    # Close the MySQL connection
    $connection.Close()

    # Read the HTML file
    $htmlFile = Get-Content $htmlFilePath -Raw

    # Replace the placeholder with the retrieved username
    $modifiedHtml = $htmlFile -replace "{Users.username}", $username

    # Write the modified HTML back to the file
    $modifiedHtml | Set-Content $htmlFilePath
}
catch {
    Write-Host "Error occurred: $_"
}
finally {
    if ($connection.State -eq 'Open') {
        $connection.Close()
    }
}
