module my_nft::my_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use std::string::String;
    use sui::transfer;
    use sui::event;

    /// NFT struct representing a unique digital asset
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        uri: String,
        creator: address,
    }

    /// Event emitted when an NFT is minted
    public struct Minted has copy, drop {
        id: ID,
        owner: address,
    }

    use sui::object::ID;

    /// Mint a new NFT
    /// 
    /// # Arguments
    /// * `name` - The name of the NFT
    /// * `description` - A description of the NFT
    /// * `uri` - The URI pointing to the NFT metadata/image (e.g., IPFS link)
    /// * `ctx` - The transaction context
    ///
    /// # Returns
    /// The UID of the newly created NFT
    public entry fun mint(
        name: String,
        description: String,
        uri: String,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        let nft_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&nft_id);

        let nft = NFT {
            id: nft_id,
            name,
            description,
            uri,
            creator: sender,
        };

        // Emit the Minted event
        event::emit(Minted {
            id: id_copy,
            owner: sender,
        });

        // Transfer the NFT to the sender
        transfer::public_transfer(nft, sender);
    }

    /// Get the name of an NFT
    public fun name(nft: &NFT): &String {
        &nft.name
    }

    /// Get the description of an NFT
    public fun description(nft: &NFT): &String {
        &nft.description
    }

    /// Get the URI of an NFT
    public fun uri(nft: &NFT): &String {
        &nft.uri
    }

    /// Get the creator of an NFT
    public fun creator(nft: &NFT): address {
        nft.creator
    }
}
