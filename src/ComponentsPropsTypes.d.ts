interface UserGeo {
  lat: string;
  lng: string;
}
interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeo;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
declare interface Props {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

declare interface MyPostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

declare interface MyTodosProps {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
}
