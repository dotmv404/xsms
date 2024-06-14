// textacoffee.js

const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

function extractCookies(headers) {
  const setCookieHeader = headers["set-cookie"];
  if (!setCookieHeader) return "";
  return setCookieHeader.map((cookie) => cookie.split(";")[0]).join("; ");
}

function extractCsrfToken(html) {
  const $ = cheerio.load(html);
  const token = $('input[name="_token"]').val();
  return token;
}

async function getCookiesAndCsrfToken() {
  try {
    console.log("Sending GET request to fetch cookies and CSRF token...");
    const response = await axios.get(
      "https://www.ooredoo.mv/webapps/textacoffee/public/",
      {
        headers: {
          Host: "www.ooredoo.mv",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.112 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-User": "?1",
          "Sec-Fetch-Dest": "document",
          "Sec-Ch-Ua": '"Chromium";v="125", "Not.A/Brand";v="24"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"Windows"',
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Priority: "u=0, i",
        },
        withCredentials: true,
      }
    );

    const cookies = extractCookies(response.headers);
    const csrfToken = extractCsrfToken(response.data);

    console.log("Cookies:", cookies);
    console.log("CSRF Token:", csrfToken);

    return { cookies, csrfToken };
  } catch (error) {
    console.error("Error in GET request:", error);
    return null;
  }
}

async function postRequest(cookies, csrfToken, number) {
  try {
    console.log("Sending POST request with cookies and CSRF token...");
    const response = await axios.post(
      "https://www.ooredoo.mv/webapps/textacoffee/public/checkuser",
      qs.stringify({
        _token: csrfToken,
        name: "asdasdaasd",
        msisdn: number,
      }),
      {
        headers: {
          Host: "www.ooredoo.mv",
          "Content-Length": "78",
          "Cache-Control": "max-age=0",
          "Sec-Ch-Ua": '"Chromium";v="125", "Not.A/Brand";v="24"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"Windows"',
          "Upgrade-Insecure-Requests": "1",
          Origin: "https://www.ooredoo.mv",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.112 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-User": "?1",
          "Sec-Fetch-Dest": "document",
          Referer: "https://www.ooredoo.mv/webapps/textacoffee/public/",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Priority: "u=0, i",
          Cookie: cookies,
        },
      }
    );

    console.log("POST response:", response.data);
  } catch (error) {
    console.error("Error in POST request:", error);
  }
}

async function textcoffe(aa) {
  let a = aa;
  const result = await getCookiesAndCsrfToken();
  if (result) {
    const { cookies, csrfToken } = result;
    if (cookies && csrfToken) {
      await postRequest(cookies, csrfToken, a);
    } else {
      console.error("Failed to retrieve cookies or CSRF token");
    }
  } else {
    console.error("Failed to retrieve cookies or CSRF token");
  }
}

module.exports = {
  textcoffe
};
