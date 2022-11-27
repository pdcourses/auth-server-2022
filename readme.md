models
*****************
user.js
---------
const {hashSync, compare} = require('bcrypt')

comparePassword(p){
    return compare(p, this.getDataValue('password'))
}

name, surname,...., role,
password: {
    field: 'passwordHash',
    type: DataTypes.TEXT,
    set(value){
        this.setDataValue('password', hashSync(value, 10));
    }
}

User.hasMany(RefreshToken, {
    foreignKey: 'userId'
})
------------------------------------------------------------
refreshtoken.js
--------------------

const isAfter = require('date-fns/isAfter);

isUnexpired(){
    return isAfter(new Date(this.get('expiredIn')), new Date());
}

userId (DataTypes.INTEGER), token (DataTypes.UUID), expiredIn (DATE), userAgent(STRING)


RefreshToken.belongsTo(User, {
     foreignKey: 'userId'
})


******************************************************************
******************************************************************




