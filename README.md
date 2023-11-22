[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/pgC2zHhI)


Link to deployment on heroku: https://eksamen-03c767ee6443.herokuapp.com/

Link to github classroom repo: https://github.com/kristiania-pg6301-2023/pg6301eksamen-williamcaamot


## FEATURES:
- [X] Darkmode
- [X] Only logged in users can create new chat rooms
- [X] Sending messages works


## TODO
- [X] Add feature so users can edit their chatrooms
- [X] Add feature so users can edit their nickname and bio
- [ ] Better error handling (EVERYWHERE?)
- [X] Make sure only logged in users can see and open chatrooms and messages
- [ ] TESTS!!!
- [ ] Fix additional data not loading correctly

### Kjente feil:
- Dersom en bruker endrer brukernavn, er det ikke satt opp relasjoner i databsen slik at brukernavnet oppdaters på meldinger som tidligere er sendt.
- Bilder på brukere med EntraID fungerer ikke
- Brukere i databasen har noe informasjon enn det som sendes rundt i server og klient, dette er ikke nødvendigvis noe dårlig
- Brukere kan fortsatt sende chatmeldinger dersom de er logget ut fra et annet vindu
- Hvis MongoDB atlas er TREGT kan det være problemer med å opprette nye chatroom (verrifisering at av samme navn ikke eksisterer fra før av)