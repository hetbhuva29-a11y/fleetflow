from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv
from pathlib import Path

async def migrate():
    ROOT_DIR = Path(__file__).parent
    load_dotenv(ROOT_DIR / '.env')
    
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    CONVERSION_RATE = 83
    
    print(f"Starting migration with rate: {CONVERSION_RATE}")
    
    # Update maintenance_logs
    m_result = await db.maintenance_logs.update_many(
        {"cost": {"$exists": True}},
        [{"$set": {"cost": {"$multiply": ["$cost", CONVERSION_RATE]}}}]
    )
    print(f"Updated {m_result.modified_count} maintenance logs")
    
    # Update fuel_logs
    f_result = await db.fuel_logs.update_many(
        {"cost": {"$exists": True}},
        [{"$set": {"cost": {"$multiply": ["$cost", CONVERSION_RATE]}}}]
    )
    print(f"Updated {f_result.modified_count} fuel logs")
    
    # Update expense_logs
    e_result = await db.expense_logs.update_many(
        {"amount": {"$exists": True}},
        [{"$set": {"amount": {"$multiply": ["$amount", CONVERSION_RATE]}}}]
    )
    print(f"Updated {e_result.modified_count} expense logs")
    
    print("Migration complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate())
