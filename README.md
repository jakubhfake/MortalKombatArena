# MortalKombatArena
 
JS, Express, Node.js, TypeScript, MySQL.

#Uruchomienie aplikacji:
1. Aby uruchomić bazę danych lokalnie uruchom np xampp następnie HeidiSqL

Tworzymy grę, w której walczy się różnymi przeciwnikami.
Przeciwnicy są tworzeni przez inne osoby w systemie.

Aplikacja składa się z 3 części:
1. Rejestracja wojownika,
2. Arena walk,
3. Sala sław.

Nie będziemy teraz implementowali jeszcze żadnej autoryzacji i uwierzytelniania. Czyli każdy może stworzyć dowolnego wojownika i dowolnie przeprowadzać walki.

Rejestracja wojownika polega na wpisaniu jego daych i rozplanowaniu umiejętności:
- Imię/Nazwa - musi być unikalna w stosunku do innych wojowników,
- Siła,
- Obrona,
- Wytrzymałość,
- Zwinność,

Trudność polega na tym, że do rozdania jest łącznie 10 punktów pomiędzy umiejętności. Każda statystyka musi wynosić min 1. łącznie statystyki muszą wynosić 10, nigdy nie mniej.
Te informacje kiedy zostaną zapisane nigdy się nie zmienią. Tzn. np. podczas walki utrata obrony jest tymczasowa, nie pownna zostać zapisana między walkami.

- Liczba zwycięst wynosi domyślnie: 0,

Arena walk
Arena polega na tym, że wybieramy z dwóch selectów dwóch różnych przeciwników (nie można tych samych). Walczą oni ze sobą,na końcu widzimy log całej walki na frontend.

Algorytm walki (można go zmodyfikować, to tylko propozycja):
----------------------
1. Każdy na początku ma tyle punktów życia (HP) ile wynosi jego wytrzymałość *10. Każdy ma na początku tyle tarczy (DP) ile wynosi jego obrona.
2. Wojownik, który zaczyna wykonuje atak o wartości równej jego sile,
3. Jeżeli wojownik atakować ma tarczę + zwinności większą niż siła ataku, to:
    3.1 Odejmowane mu jest tarcza w wysokości ataku.
   3.1 A) Jeżeli atak był większy niż tarcza, to odejmowana jest mu od życia pozostała ilość siły ataku.
   3.1 B) Jeżeli atak był maksymalnie tyle ile wynosi tarcza, to nie jest odejmowane życie.
   3.2 Jeżeli warunek 3 NIE JEST SPEŁNIONY to po prostu od życia odejmujemy atak.
    4. Następnie zmiana kolejności i teraz atakowany zostaje atakijącym, a atakujący zostaje atakowanym.
    5. Powtarzamy punkty 2 - 4 tak długo, dopuki ktoś nie umrze, czyli jego HP nie spadnie do min. 0.
    
    Gdy jeden z wojowników umrze, to atakujący zostaje zwycięzcą. Zapisujemy mu w bazie +1 do zwycięstw.
       Podczas walki, powinien się generować dokładny log, który zostanie zwrócony na frontend. Pownienien on zawierać szczegółowe informacje - kto atakuje, czy powiodła się obrona, ile zostało zabrane z tarczy itp.
    
Sala sław
------------------

Jest to miejsce, w którym wypisujemy 10 najlepszych śmiałków. Najwyżej pokazujemy tych z największą ilością zwycięstw, w formie listy:pozycję, ilość zwyciestw i imię wojownika.
 
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
- Rekordy WOJOWNIKA / Baza danych: (podstawowa konfiguracja bazy danych znajduje się w SQL/mortal_combat_arena_basic.sql)
    - Nazwa bazy danych: mortal_kombat_arena,
    - Tabele:
        - warriors,
            - ID - UUID VARCHAR(36)
            - Imię/Nazwa - VARCHAR(?) - unikalne
            - Siła - THINYINT(2)
            - Obrona - THINYINT(2)
            - Wytrzymałość - THINYINT(2)
            - Zwinność -THINYINT(2)
            - Liczba zwycięstw: domyślnie 0 - INT(11)
 - Logika związana z tworzeniem wojowników, 
 - Logika związana z salą sław
 - Logika związana z areną walk,
    
2. V2:
- Log walki: możesz zrobić bardzo ładną wersję tego - poprzez dodanie np. ikon czy innych kolorów w zależności od typu sytuacji,
-  Dodać frontend'owy JS, który ułatwi przydzielanie punktów u wojowników,