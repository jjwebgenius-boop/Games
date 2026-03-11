exports.handler = async (event) => {
  try {
    const rawPath = event.path || "";
    const proxyPrefix = "/api/proxy/";
    const apiPath = rawPath.startsWith(proxyPrefix) ? rawPath.slice(proxyPrefix.length) : "";

    if (!apiPath) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "Ruta de API invalida" }),
      };
    }

    const query = event.rawQuery || "";
    const targetUrl = `https://www.freetogame.com/api/${apiPath}${query ? `?${query}` : ""}`;

    const response = await fetch(targetUrl);
    const data = await response.text();
    const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";

    return {
      statusCode: response.status,
      headers: { "content-type": contentType },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        error: "Error al conectar con la API externa",
        detail: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
