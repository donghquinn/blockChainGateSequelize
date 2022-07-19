import { Model } from 'sequelize';

// generate Model classes extend from 'Model' class of Sequelize

// Uid class is the base class for all the Model classes about to generate.
export class Uid extends Model {
  declare uid: number;
  declare memo: string | null;
  declare created: Date;
  declare updated: Date;
}

// AddressInfo Model class for address_sign_info and address_lookup_info
export class AddressInfo extends Uid {
  declare address: string;
  declare client_id: number;
}

// OutRequest Model class for out_request_info and out_request_fail_info
export class OutRequest extends Uid {
  declare uuid: string;
  declare client_id: number;
  declare tx_id: string | null;
  declare nonce: number | null;
  declare contract_address: string | null;
  declare name: string | null;
  declare symbol: string | null;
  declare from_address: string;
  declare to_address: string;
  declare amount: string;
  declare decimals: number;
  declare token_id: string | null;
  declare status: string;
  declare custome_data: string | null;
}

// Notify Model class for out_notify_info and in_notify_info
export class Notify extends Uid {
  declare client_id: number;
  declare tx_id: string;
  declare contract_address: string | null;
  declare name: string;
  declare symbol: string;
  declare from_address: string | null;
  declare to_address: string | null;
  declare amount: string;
  declare decimals: string;
  declare token_id: string | null;
  declare status: string;
}
