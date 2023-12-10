let btn = document.getElementById("shorten");

btn.addEventListener('click', short);

async function short() {
    let longURL = document.getElementById("longurl").value;
    let shortURL = document.getElementById("shorturl");

    try {
        const response = await fetch(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`);
        const shortenedURL = await response.text();

        if (response.ok) {
            shortURL.value = shortenedURL;

            // Enable the "Copy" button
            let copyButton = document.getElementById("copy");
            copyButton.disabled = false;

            // Add click event listener to the "Copy" button
            copyButton.onclick = () => {
                shortURL.select();
                document.execCommand("copy");
                // Optionally, provide feedback to the user that the text has been copied
                alert("Copied to clipboard!");
            };
        } else {
            throw new Error("URL shortening failed");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        shortURL.value = "Error shortening URL";
    }
}
