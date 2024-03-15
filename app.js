// Función para extraer información de las líneas #EXTINF
function extractEntryInfo(line) {
    const match = line.match(/#EXTINF:-1 type="video" tvg-id="([^"]+)" tvg-logo="([^"]+)" description="([^"]+)",(.+)/);
    if (match) {
        const [_, tvgId, logo, description, movieInfo] = match;
        return { tvgId, logo, description, movieInfo };
    }
    return null;
}

// Función para procesar la lista M3U a partir de una cadena
function processM3UString(m3uList) {
    const lines = m3uList.split('\n');
    const entries = [];

    let currentEntry = null;
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('#EXTINF')) {
            currentEntry = extractEntryInfo(line);
            if (currentEntry) {
                entries.push(currentEntry);
            }
        } else if (line.startsWith('http') && currentEntry) {
            currentEntry.url = line;
            currentEntry = null;
        }
    }
    return entries;
}

// Ejemplo de uso
const m3uList = `#EXTINF:-1 type="video" tvg-id="Não Olhe para Cima" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/6Sc7Tjt7aPsdghYK32mDMFeZkqJ.jpg" description="",Não Olhe para Cima
http://lismeo.com/movie/italiano/a4nUUH/391374.mp4
#EXTINF:-1 type="video" tvg-id="Não Devíamos Ter Crescido" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/fWwr0mLfuA7j65BiCISmMUbDmK4.jpg" description="",Não Devíamos Ter Crescido
http://lismeo.com/movie/italiano/a4nUUH/391377.mp4
#EXTINF:-1 type="video" tvg-id="Nada de Novo no Front" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/qmcKs0Aoft7MBdBoj1haZyPRgM2.jpg" description="",Nada de Novo no Front
http://lismeo.com/movie/italiano/a4nUUH/391384.mp4
#EXTINF:-1 type="video" tvg-id="Na Sua Casa ou na Minha?" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/m7OCBWL0CngPMwe4b0iEsGxrlYg.jpg" description="",Na Sua Casa ou na Minha?
http://lismeo.com/movie/italiano/a4nUUH/391385.mp4`;

const entries = processM3UString(m3uList);
console.log(entries);
