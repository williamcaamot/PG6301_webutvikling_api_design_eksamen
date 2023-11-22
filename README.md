[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/pgC2zHhI)


Link to deployment on heroku: https://eksamen-03c767ee6443.herokuapp.com/

Link to github classroom repo: https://github.com/kristiania-pg6301-2023/pg6301eksamen-williamcaamot


## FEATURES:
- [X] Darkmode/Lightmode :D
- [X] Anonyme brukere kan ikke se chatlog
- [X] Brukere kan logge inn med Google og EntraID (og logge seg ut igjen)
- [X] Brukere kan se og redigere sin profilside
- [X] Meldinger lagres i MongoDB (brukerinformasjon også)
- [X] Chat fungerer med websockets - Meldinger sendes til/fra sockets (sockets trigger ikke refresh, men meldinger sendes med sockets)
- [X] Chatmeldinger inneholder navn (bruker nicknname som er fornavn fra identity provider, men dette kan endres av brukeren)
- [X] Brukere kan opprette chatroom der de selv velger tittel og beskrivelse
- [X] Brukere kan selv velge chatrom
- [X] Systemet hindrer brukere fra å opprette to chatroom med samme tittel
- [X] Brukere kan endre beskrivelse og tittel på sine chatroom (chatroom som tilhører bruker listes på profilsiden, og endres derfra(trykk på chatrommet))
- [X] Brukere kan endre sin bio og nickname - Man kan også se andre sin profilside (må være logget inn), ved å trykke på navn/bilde i chat
- [X] Brukere forblir innlogget når de refresher siden
- [X] De ALLER fleste feil presenteres til brukeren (alle feil jeg klarer å produsere...)

## TODO
- [X] Add feature so users can edit their chatrooms
- [X] Add feature so users can edit their nickname and bio
- [ ] Better error handling (EVERYWHERE?)
- [X] Make sure only logged in users can see and open chatrooms and messages
- [ ] TESTS!!!

### Kjente feil:
- Dersom en bruker endrer brukernavn, er det ikke satt opp relasjoner i databsen slik at brukernavnet oppdaters på meldinger som tidligere er sendt.
- Bilder på brukere med EntraID fungerer ikke
- Brukere kan fortsatt sende chatmeldinger dersom de logget ut fra et annet vindu
- Hvis MongoDB atlas er TREGT kan det være problemer verifisering av å opprette nye chatroom (at samme navn ikke eksisterer fra før av)


### Ressurser brukt:
- https://stackoverflow.com/questions/68692385/mock-router-in-react-testing-library-and-jest
- 