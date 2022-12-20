export class Contacts {
  resourceName: string;
  etag: string;
  names:Names[]=[];
  emailAddresses?: null | EmailAddresses[] =[] ;
  phoneNumbers?:  PhoneNumbers[]=[];
  metadata: Metadata;
}
export class Names {
  metadata: Metadata;
  displayName: string;
  familyName?: string ;
  givenName: string;
  displayNameLastFirst: string;
  unstructuredName: string;
}

export class Source {
  type: string;
  id: string;
}
export class EmailAddresses {
  metadata: Metadata;
  value: string;
}
export class Membership {
  metadata: Metadata
  contactGroupMembership: ContactGroupMembership
}
export class ContactGroupMembership {
  contactGroupId: string
  contactGroupResourceName: string
}
export class Metadata {
  primary?: boolean ;
  source: Source;
  verified?: boolean ;
  sourcePrimary?: boolean ;
}
export class PhoneNumbers {
  metadata: Metadata;
  value: string;
}
export class DeleteContacts {
  resourceNames: string[] = [];
}

export type UserInfo = {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string,
  }
}
