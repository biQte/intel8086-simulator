# Symulator procesora Intel 8086

Symulator został wykonany jako projekt na studia z przedemiotu: `Architektura systemów komputerowych`

## Aby odpalić symulator u siebie musisz wykonać następujące kroki:

### 1. Sklonuj to repozytorium i otwórz je w swoim preferowanym edytorze (Polecam Visual Studio Code)

### 2. Jeśli nie masz zainstalowanego node.js i npm zainstaluj je
> Możesz pobrać je [tutaj](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 

### 3. W edytorze otwórz terminal i zainstaluj wymagane paczki
```bash
npm install
```

### 4. Aby włączyć podgląd strony podaj komendę
```bash
npm run dev
```

### 5. Aby zbudować i zminifikować stronę podaj komendę
```bash
npm run build
```

### 6. Gotowe pliki strony do osadzenia na serwerze będą znajdowały się w katalogu dist
```
├── cpu-simulator/
│   ├── public/
│   ├── src/
│   ├── dist/
```
