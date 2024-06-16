FLASH MESSAGES

1. install a package called connect-FLASH
2. make sure you put conenct flash in a app.use function
3. kisi bhi route me aapko flash create krna hoga
4. kisi bhi doosre route pr app.use chalane ka try kre

ALSO AAP CONNECT FLASH USE NHI KR SKTE BINNA EXPRESS SESSION K


open terminal of vs code
npm i connect-flash

open terminal - npm i express-session
now go to app.js
const expressSession = require('express-session');
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret : "Pahul"
}));
also require connect flash in app.js
const flash = require('connect-flash')
app.use(flash());

HUMLOG CHAHTE H KI JB HM KSII BHI ROUTE PR JAE..JAISE KI /FAILED..US ROUTE PR EK FLASH MESAGE BNE AUR VOH FLASH MESSAGE HM LOGON KO /ROUTE PR DIKHE..EJS M
BASICALLY FLASH MESAGE MEANS SERVER KE KISI ROUTE PR DATA BNANA AND US DATA KO DOOSRE ROUTE PR USE KR PAANA

flash message aapko yeah allow krta h ki aap ek route ke bne hue dta ko doosre route me use kr sko 