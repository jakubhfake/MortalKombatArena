# MortalKombatArena
 
JS, Express, Node.js, TypeScript, MySQL

Tworzymy grę, w której walczy się różnymi przeciwnikami.
Przeciwnicy są tworzeni przez inne osoby w systemie.

Aplikacja składa się z 3 części:
1. Rejestracja wojownika,
2. Arena walk,
3. Sala sław.

Nie będziemy teraz implementowali jeszcze żadnej autoryzacji i uwierzytelniania. Czyli każdy może stworzyć dowolnego wojownika i dowolnie przeprowadzać walki.

@@ ToDo 20 tydz 4 czas 31:40


Gdy jedenwojownik zginie, to atakujący zostaje wycięzcą. Zapisujemy mu w bazie +1 do zwycięstw.
Podczas walki, powinien się generować dokładny log, który zostanie zwrócony na frontend.Powinien on zwierać szczegółowe informacje - ktokogo atkije, czy powiodłasię obrona, i ile zostało zabrane z tarczy itp.

Sala sław
Jest to miejsce, w którym wpisujemy 10 najlepszych wojowników. Najwyżej pokazujemy tych z największą ilością zwycięstw. Pokazujemy na liście: pozycję, ilość zwycięstw i imię wojownika.

* Realizacja: Uniue na bazie / Logika / Unique + logika.
** Możesz zrobić bardzo ładną wersję tego - poprzez dodanie np. ikon czy innych kolorów w zależności od typu sytuacji,

PLAN:
1. v1:
- Skonfigurować WS, OK
- Potrzebne paczki i konfiguracja TS, OK
- Konfiguracja Express'ai folder publiczny - pliki statyczne, OK
- Ogólna struktura routerów - ścieżek - zaplanować jakie ścieżki się pojawią: OK
    - Strona główna,
      - /,
    - Rejestracja wojowników,
      - Formularz,
      - Zapisywanie,
    - Arena walk,
      - Formularz wybiru wojownika,
      - Przeprowadzenie walki / Log walki
    - Sala sław,
        - Lista wojowników,
- Zaplanowanie widoków / ogólna struktura, OK
- Rekordy WOJOWNIKA,
- Logika związana z tworzeniem wojowników,
- Logika związana z salą sław
- Logika związana z areną walk,
    
2. V2:
- Log walki: możesz zrobić bardzo ładną wersję tego - poprzez dodanie np. ikon czy innych kolorów w zależności od typu sytuacji,
-  Dodać frontend'owy JS, który ułatwi przydzielanie punktów u wojowników,