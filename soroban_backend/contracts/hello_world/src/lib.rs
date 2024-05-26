#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Vec, Map};

#[contract]
pub struct CapsuleContract;

#[contracttype]
#[derive(Clone)]
pub struct Capsule {
    pub description: Symbol,
    pub unlock_timestamp: u64,
    pub metadata: Vec<Symbol>,
    pub image_hash: Symbol,
}

#[contractimpl]
impl CapsuleContract {
    pub fn create_capsule(env: Env, description: Symbol, unlock_timestamp: u64, metadata: Vec<Symbol>, image_hash: Symbol) -> u64 {
        let mut capsules: Map<u64, Capsule> = env.storage().persistent().get(&symbol_short!("CAPSULES")).unwrap_or_else(|| Map::new(&env));
        let id = capsules.len() as u64 + 1;
        let capsule = Capsule {
            description,
            unlock_timestamp,
            metadata,
            image_hash,
        };
        capsules.set(id, capsule);
        env.storage().persistent().set(&symbol_short!("CAPSULES"), &capsules);
        id
    }

    pub fn get_capsule(env: Env, id: u64) -> Option<Capsule> {
        let capsules: Map<u64, Capsule> = env.storage().persistent().get(&symbol_short!("CAPSULES")).unwrap_or_else(|| Map::new(&env));
        capsules.get(id).map(|capsule| capsule.clone())
    }

    pub fn get_capsule_ids(env: Env) -> Vec<u64> {
        let capsules: Map<u64, Capsule> = env.storage().persistent().get(&symbol_short!("CAPSULES")).unwrap_or_else(|| Map::new(&env));
        let mut keys = Vec::new(&env);
        for key in capsules.keys() {
            keys.push_back(key);
        }
        keys
    }
}

