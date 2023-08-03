import puppeteer from "puppeteer";

async function PremierLeagueMatches(jornada) {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const url = "https://promiedos.com.ar/inglaterra";

    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".cfecha");
    await page.evaluate((jornada) => {
      const jornadaElement = document.querySelector(`[onclick="irfecha('${jornada}_33')"]`);
      if (jornadaElement) {
        jornadaElement.click();
      }
    }, jornada);

    await page.waitForTimeout(2000);

    await page.waitForSelector("#fixturein table");

    const rows = await page.$$eval("#fixturein table tbody tr", (elements) =>
      elements.map((tr) => tr.textContent.trim())
    );

    const fechas = [];
    let fechaActual = "";

    for (const row of rows) {
      if (
        row.startsWith("Viernes") ||
        row.startsWith("Sábado") ||
        row.startsWith("Domingo") ||
        row.startsWith("Lunes") ||
        row.startsWith("Martes") ||
        row.startsWith("Miércoles") ||
        row.startsWith("Jueves")
      ) {
        fechaActual = row;
        fechas.push(fechaActual);
      } else {
        fechas.push(row);
      }
    }

    await browser.close();
    return fechas.join("\n");
  } catch (error) {
    console.error("Error en el scraping:", error);
    await browser.close();
    throw error;
  }
}

export default PremierLeagueMatches;
