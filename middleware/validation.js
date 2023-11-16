module.exports = {
    validateToken : (req, res, next) => {
        try {
            if (!req.token) {
                return res.status(400).send({
                    success : false,
                    message : "You Dont Have a Token",
                });
            }
            else {
                const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
                if ((!verifyData)) {
                    return res.status(401).send({
                        success :false,
                        message : "Unauthorized Request",
                    });
                };
                // ! NEXT
                req.userData = verifyData;
                next();
            };
        } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid Token");
        };
    },

    authorizePromotor : (req, res, next) => {
        if (req.userData.role !== "promotor") {
            return res.status(401).send("Unauthorized to Feature");
        }
        else {
            next();
        }
    },
};