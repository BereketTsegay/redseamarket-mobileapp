export class PlaceAdRequest{
    category: Number = 0;
    subcategory: Number = 0;
    //first place add screen
    title: String = '';
    titleinArabic: String = '';
    canonical_name: String = '';
    description: String = '';
    descriptioninArabic: String = '';
    image: Image[] = [];
    price: Number = 0;
    country: Number = 0;
    state: Number = 0;
    city: Number = 0;
    area: string = '';
    sub_area: String = '';
    sub_area2: String = '';
    negotiable: Boolean = false;
    featured: Number = 0;

    //Seller Information
    name: String = '';
    email: String = '';
    phone: Number = 0;
    address: String = '';
    latitude: Number = 0;
    longitude: Number = 0;
    phone_hide: Boolean = false;

     //Motor Information
     make_id: Number = 0;
     model_id: Number = 0;
     variant_id: Number = 0;
     registration_year: String = '';
     fuel: String = '';
     transmission: String = '';
     condition: String = '';
     mileage: Number = 0;
     aircondition: String = '';
     gps: String = '';
     security: String = '';
     tire: String = '';

     //Sale or Rent Information
     size: String = '';
     room: String = '';
     furnished: String = '';
     building: String = '';
     parking: Boolean = false;
}

export class Image {
    value: String = '';
}