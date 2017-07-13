# loyalty-card

### Routes

- POST - `/stamp`
```json
{
	"guid": "7b6e845e-1aaf-42f4-9e56-05efd8ac0d14"
}
```
```
No Response Body
```

- GET - `/card?guid=7b6e845e-1aaf-42f4-9e56-05efd8ac0d14`
```
No Request Body 
```
```json
[
    {
        "count": 2,
        "company": {
            "name": "Fake Company"
        }
    },
    {
        "count": 3,
        "company": {
            "name": "Fake Company 2"
        }
    },
    {
        "count": 10,
        "company": {
            "name": "Fake Company"
        }
    }
]
```
