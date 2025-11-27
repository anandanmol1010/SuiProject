module defi_demo::lending {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;

    /// Represents a user's deposit position in the lending protocol
    public struct DepositPosition has key {
        id: UID,
        user: address,
        asset_type: u8, // 0 = SUI, 1 = USDC (placeholder)
        amount: u64,
    }

    /// Represents a user's borrow position in the lending protocol
    public struct BorrowPosition has key {
        id: UID,
        user: address,
        asset_type: u8,
        amount: u64,
    }

    /// Event emitted when a user deposits
    public struct Deposited has copy, drop {
        user: address,
        asset_type: u8,
        amount: u64,
    }

    /// Event emitted when a user borrows
    public struct Borrowed has copy, drop {
        user: address,
        asset_type: u8,
        amount: u64,
    }

    /// Event emitted when a user repays
    public struct Repaid has copy, drop {
        user: address,
        asset_type: u8,
        amount: u64,
    }

    /// Deposit SUI into the lending protocol
    /// 
    /// # Arguments
    /// * `coin` - The SUI coin to deposit
    /// * `ctx` - The transaction context
    public entry fun deposit(
        coin: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&coin);

        // Create a deposit position
        let position = DepositPosition {
            id: object::new(ctx),
            user: sender,
            asset_type: 0, // SUI
            amount,
        };

        // Emit event
        event::emit(Deposited {
            user: sender,
            asset_type: 0,
            amount,
        });

        // Store the coin (in a real implementation, this would be stored in a pool)
        let _balance = coin::into_balance(coin);
        // TODO: Store balance in a shared pool object

        // Transfer position to user
        sui::transfer::transfer(position, sender);
    }

    /// Borrow from the lending protocol
    /// 
    /// # Arguments
    /// * `amount` - The amount to borrow
    /// * `ctx` - The transaction context
    public entry fun borrow(
        amount: u64,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);

        // Create a borrow position
        let position = BorrowPosition {
            id: object::new(ctx),
            user: sender,
            asset_type: 0, // SUI
            amount,
        };

        // Emit event
        event::emit(Borrowed {
            user: sender,
            asset_type: 0,
            amount,
        });

        // TODO: In a real implementation, mint and transfer borrowed tokens to user

        // Transfer position to user
        sui::transfer::transfer(position, sender);
    }

    /// Repay a borrow position
    /// 
    /// # Arguments
    /// * `borrow_position` - The borrow position to repay
    /// * `coin` - The repayment coin
    /// * `ctx` - The transaction context
    public entry fun repay(
        borrow_position: BorrowPosition,
        coin: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        let amount = coin::value(&coin);

        // Verify the repayer is the borrower
        assert!(borrow_position.user == sender, 1001);

        // Emit event
        event::emit(Repaid {
            user: sender,
            asset_type: 0,
            amount,
        });

        // TODO: In a real implementation, burn the repayment tokens and update pool

        let _balance = coin::into_balance(coin);
        let BorrowPosition { id, user: _, asset_type: _, amount: _ } = borrow_position;
        object::delete(id);
    }

    /// Get the amount deposited in a position
    public fun deposit_amount(position: &DepositPosition): u64 {
        position.amount
    }

    /// Get the amount borrowed in a position
    public fun borrow_amount(position: &BorrowPosition): u64 {
        position.amount
    }
}
