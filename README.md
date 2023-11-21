[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/pgC2zHhI)


Link to deployment on heroku: https://eksamen-03c767ee6443.herokuapp.com/

Link to github classroom repo: https://github.com/kristiania-pg6301-2023/pg6301eksamen-williamcaamot

It's difficult to decide how to handle new messages, send to socket? Or via a POST request?
Can be easier to handle auth with a post request to server?


MongoDB was at times REALLY slow today, when it was really slow the checking for exisiting chatrooms didn't work.. If it's posisble to add multiples of the same chatroom, that's because of mongodb being slow..
## FEATURES:
- [X] Darkmode
- [X] Only logged in users can create new chat rooms
- [X] Sending messages works


## TODO
- [ ] Add feature so users can edit their chatrooms
- [ ] Add feature so users can edit their nickname and bio
- [ ] Better error handling (EVERYWHERE?)
- [ ] Make sure only logged in users can see and open chatrooms and messages
- [ ] TESTS!!!
- [ ] Fix additional data not loading correctly

### Kjente feil:
- Dersom en bruker endrer brukernavn, er det ikke satt opp relasjoner i databsen slik at brukernavnet oppdaters på meldinger som tidligere er sendt.
- Bilder på brukere med EntraID fungerer ikke