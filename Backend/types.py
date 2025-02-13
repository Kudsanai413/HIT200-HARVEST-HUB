class Crops:
    main_crop : str
    additional_crops : list[str]

    def __init__(self, main_crop : str, additional_crops : str):
        self.main_crop = main_crop
        self.additional_crops = additional_crops.split(',')

    def setUser(self, records: list[str]) -> dict[str]:
        user : dict[str]  = {}

        for column in records:
            user.update({
                "user_id" : column[0],
                "userName": column[1],
                "user_contact": column[2],
                "main_crop": column[3],
                "additional_crops": column[4]
            })

        return user




class Farmer(Crops):
    farmer_id : str
    farmer_name: str
    farmer_contact : str



class Buyer(Crops):
    buyer_id: str
    buyer_name: str
    farmer_contact : str
