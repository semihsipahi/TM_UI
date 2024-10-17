export default async function customFetch({ options, settings }) {
  let { headers } = options;
  const { url, method = "GET", body = null } = options;
  const {
    onSuccess,
    onStart,
    messages = {},
    showDuration = false,
    showOptionsSummaryBeforeSent = false,
    showRawResponse = false,
    showResponse = false,
    showStringified = false,
  } = settings || {};

  const startTime = showDuration ? performance.now() : undefined;

  if (onStart) {
    onStart(messages.onStart || "");
  }

  if (showOptionsSummaryBeforeSent) {
    console.log(
      "Sending request with options:",
      showStringified
        ? JSON.stringify({ url, method, headers, body }, null, 2)
        : { url, method, headers, body }
    );
  }

  const parsedToken = localStorage.getItem("active-user");

  if (parsedToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${parsedToken}`,
    };
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      cache: "no-cache",
    });

    const textResponse = await response.text();

    if (showRawResponse) {
      console.log("Raw response:", textResponse);
    }

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${textResponse}`
      );
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (jsonError) {
      throw new Error(`Failed to parse JSON response. Body: ${textResponse}`);
    }

    if (showResponse) {
      console.log(
        "Parsed response:",
        showStringified ? JSON.stringify(data, null, 2) : data
      );
    }

    if (showDuration && startTime) {
      const endTime = performance.now();
      console.log(`Request duration: ${endTime - startTime} ms`);
    }

    if (messages.onFinish) {
      console.log(messages.onFinish);
    }

    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  } catch (error) {
    if (messages.onError) {
      console.error(messages.onError);
    }
  }
}
