// ObjectIDs generated courtesy of https://nddapp.com/object-id-generator.html

module.exports = {
  async up (db, client) {
    // const objectID = require('mongodb').ObjectID

    const merchantNames = [
      'Washington Capitals',
      'Las Vegas Golden Knights',
      'Toronto Maple Leafs',
      'Tampa Bay Lightning',
      'Colorado Avalanche',
      'Boston Bruins',
      'Detroit Red Wings',
      'Dallas Stars',
      'Nashville Predators',
      'New York Rangers'
    ]

    const categoryNames = [
      'Tickets',
      'Subscriptions',
      'Concessions',
      'Merchandise',
      'Eshop'
    ]

    const userNames = [
      'Tadas Tsibulskis',
      'Palmer Daves',
      'Darryl Thode',
      'Lakeisha Yim',
      'Micaela Quesnel',
      'Lori Tye',
      'Tierra Leiva',
      'Marcellus Eckman',
      'Melodee Armstead',
      'Dorothea Marse',
      'Nita Waldrip',
      'Roger Toro',
      'Patty Warwick',
      'Stephaine Setliff',
      'Isaura Hibbler',
      'Tesha Ratledge',
      'Maribel Hubble',
      'Leeanna Feuerstein',
      'Ninfa Prendergast',
      'Arron Holt',
      'Rosalina Doerr',
      'Rosana Stigall',
      'Kanesha Fredenburg',
      'Iluminada Sharlow',
      'Viola Swihart',
      'Tomeka Mckinsey',
      'Leona Chavira',
      'Doloris Perera',
      'Clemente Yan',
      'Bert Uvalle',
      'Adell Mannella',
      'Jeffery Jeffords',
      'Adah Mcgrady',
      'Corrie Courts',
      'Otis Slaymaker',
      'Macie Marcano',
      'Alycia Cumbie',
      'Cristin Niver',
      'Jackelyn Bonfiglio',
      'Katharina Vizcaino',
      'Rosalva Carriere',
      'Carola Busse',
      'Evie Carpino',
      'Neely Alberico',
      'Williemae Halfacre',
      'Mckenzie Moris',
      'Shalonda Lozoya',
      'Sadye Miesner',
      'Jade Brame',
      'Claudio Earle'
    ]

    const dobs = [
      '1993-03-15',
      '1967-06-10',
      '1984-09-10',
      '1994-11-22',
      '1991-03-04',
      '1963-12-30',
      '1992-07-07',
      '1979-08-01',
      '1979-05-28',
      '1985-11-22',
      '1973-09-15',
      '1982-08-17',
      '1982-03-23',
      '1991-11-26',
      '1973-01-17',
      '1971-12-27',
      '1973-12-23',
      '1975-04-02',
      '1989-11-13',
      '1982-05-22',
      '1971-09-11',
      '1989-02-25',
      '1981-08-21',
      '1974-04-27',
      '1978-11-16',
      '1970-09-21',
      '1975-12-01',
      '1966-06-10',
      '1970-10-02',
      '1995-11-30',
      '1992-03-24',
      '1975-06-19',
      '1995-04-28',
      '1980-09-20',
      '1969-01-25',
      '1974-08-28',
      '1978-06-10',
      '1989-12-21',
      '1996-05-21',
      '1988-07-23',
      '1997-01-03',
      '1974-01-15',
      '1998-07-06',
      '1990-08-08',
      '1963-11-29',
      '1973-11-12',
      '1987-08-17',
      '1970-07-18',
      '1978-10-09',
      '1976-02-07'
    ]

    await db.createCollection('merchants')
    await merchantNames.forEach((name) => {
      db
        .collection('merchants')
        .insertOne({ name })
    })

    await db.createCollection('categories')
    await categoryNames.forEach((name) => {
      db
        .collection('categories')
        .insertOne({ name })
    })

    await db.createCollection('users')
    await userNames.forEach((name, i) => {
      const obj = {
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1],
        dob: dobs[i]
      }
      db
        .collection('users')
        .insertOne(
          { ...obj }
        )
    })
  },

  async down (db, client) {
    await db.collection('merchants').drop()
    await db.collection('categories').drop()
    await db.collection('users').drop()
    await db.collection('transactions').drop()
  }
}
