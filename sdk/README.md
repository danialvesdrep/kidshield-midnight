# 🛡️ KidShield SDK

**Easy integration for child protection on any platform**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Midnight](https://img.shields.io/badge/Midnight-Network-purple)

---

## 📦 Installation
```bash
npm install @kidshield/sdk
# or
yarn add @kidshield/sdk
```

---

## 🚀 Quick Start
```typescript
import { KidShield } from '@kidshield/sdk';

// Initialize
const kidshield = new KidShield({
  apiKey: 'your_api_key_here',
  network: 'testnet' // or 'mainnet'
});

// Verify a child
const result = await kidshield.verifyChild({
  childId: 'child_abc123',
  platformId: 'discord'
});

if (result.isVerified) {
  console.log('✅ Child verified!');
  enableKidProtections();
}
```

---

## 📖 Documentation

### Configuration
```typescript
interface KidShieldConfig {
  apiKey: string;           // Your API key
  apiUrl?: string;          // Custom API URL (optional)
  network?: 'testnet' | 'mainnet';
  timeout?: number;         // Request timeout in ms
}
```

### Methods

#### `registerChild(data)`

Register a new child in the system.
```typescript
const result = await kidshield.registerChild({
  parentId: 'parent_maria_123',
  childName: 'João Silva',
  birthYear: 2014
});

console.log(result.childId); // 'child_xyz789'
```

#### `verifyChild(data)`

Verify if a user is a registered child.
```typescript
const result = await kidshield.verifyChild({
  childId: 'child_xyz789',
  platformId: 'roblox'
});

console.log(result.isVerified); // true
console.log(result.ageRangeDescription); // '8-12 years'
```

#### `quickVerify(childId, platformId)`

Quick boolean verification.
```typescript
const isVerified = await kidshield.quickVerify('child_xyz789', 'minecraft');

if (isVerified) {
  allowAccess();
} else {
  blockAccess();
}
```

#### `reportThreat(data)`

Report a suspicious contact attempt.
```typescript
const result = await kidshield.reportThreat({
  victimId: 'child_xyz789',
  suspectId: 'suspect_adult_456',
  platformId: 'discord',
  threatLevel: 8, // 1-10 (7+ is critical)
  description: 'Requested personal information'
});

console.log(result.isCritical); // true
console.log(result.actions.parentsNotified); // true
```

#### `getStatistics()`

Get system statistics.
```typescript
const stats = await kidshield.getStatistics();

console.log(stats.totalChildrenRegistered); // 1247
console.log(stats.totalThreatsBlocked); // 89
```

#### `healthCheck()`

Check API availability.
```typescript
const isOnline = await kidshield.healthCheck();

if (!isOnline) {
  console.log('API offline - using fallback mode');
}
```

---

## 🎮 Integration Examples

### Discord Bot
```typescript
import { KidShield } from '@kidshield/sdk';
import { Client, GatewayIntentBits } from 'discord.js';

const kidshield = new KidShield({ apiKey: process.env.KIDSHIELD_API_KEY });
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('guildMemberAdd', async (member) => {
  const isVerified = await kidshield.quickVerify(member.id, 'discord');
  
  if (isVerified) {
    await member.roles.add('verified-child-role-id');
    console.log(`✅ ${member.user.tag} verified as child`);
  } else {
    await member.send('Please verify your age to access the server.');
  }
});

client.login(process.env.DISCORD_TOKEN);
```

### Roblox Game
```lua
-- Lua example for Roblox
local HttpService = game:GetService("HttpService")

function verifyPlayer(userId)
    local url = "https://api.kidshield.io/api/verify-child"
    local data = {
        childId = tostring(userId),
        platformId = "roblox"
    }
    
    local response = HttpService:PostAsync(url, HttpService:JSONEncode(data))
    local result = HttpService:JSONDecode(response)
    
    return result.data.isVerified
end

game.Players.PlayerAdded:Connect(function(player)
    local isVerified = verifyPlayer(player.UserId)
    
    if isVerified then
        print("Player is verified child")
        -- Apply kid-safe settings
        player.ChatMode = Enum.ChatMode.TextAndMenu
    end
end)
```

### Minecraft Plugin (Java)
```java
import com.kidshield.sdk.KidShield;
import org.bukkit.event.player.PlayerJoinEvent;

public class KidShieldPlugin extends JavaPlugin {
    private KidShield kidshield;
    
    @Override
    public void onEnable() {
        kidshield = new KidShield("your_api_key");
    }
    
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        String playerId = event.getPlayer().getUniqueId().toString();
        
        kidshield.quickVerify(playerId, "minecraft").thenAccept(isVerified -> {
            if (isVerified) {
                event.getPlayer().sendMessage("§a✅ Verified child - protections enabled");
                applySafetySettings(event.getPlayer());
            }
        });
    }
}
```

### Unity Game (C#)
```csharp
using UnityEngine;
using KidShield;

public class PlayerManager : MonoBehaviour
{
    private KidShieldClient kidshield;
    
    void Start()
    {
        kidshield = new KidShieldClient("your_api_key");
    }
    
    async void OnPlayerLogin(string playerId)
    {
        var result = await kidshield.VerifyChildAsync(playerId, "unity-game");
        
        if (result.IsVerified)
        {
            Debug.Log("✅ Child verified");
            EnableKidMode();
            DisableChat();
            ApplyContentFilter();
        }
    }
}
```

---

## 🔐 Security Best Practices

### 1. **Never expose API keys in client-side code**
```typescript
// ❌ BAD - API key in frontend
const kidshield = new KidShield({ apiKey: 'sk_live_123...' });

// ✅ GOOD - API key on server
// Frontend calls your backend, backend calls KidShield
```

### 2. **Validate on your backend**
```typescript
// Your backend endpoint
app.post('/verify-user', async (req, res) => {
  const { userId } = req.body;
  
  const result = await kidshield.verifyChild({
    childId: userId,
    platformId: 'your-platform'
  });
  
  res.json({ isVerified: result.isVerified });
});
```

### 3. **Handle errors gracefully**
```typescript
try {
  const result = await kidshield.verifyChild(data);
  // Handle success
} catch (error) {
  console.error('KidShield error:', error);
  // Apply default safe settings
  applyDefaultProtections();
}
```

---

## 🎯 Features

✅ **Zero Knowledge Proofs** - Age verified without exposing data  
✅ **Cross-Platform** - Block threats across all integrated platforms  
✅ **Real-time Alerts** - Parents notified instantly of critical threats  
✅ **Easy Integration** - 3 lines of code to get started  
✅ **TypeScript Support** - Full type definitions included  
✅ **Framework Agnostic** - Works with any JavaScript/TypeScript project  

---

## 📊 Response Types

### VerificationResult
```typescript
{
  success: boolean;
  isVerified: boolean;
  ageRange: number; // 1 (5-7), 2 (8-12), 3 (13-17)
  ageRangeDescription: string; // "8-12 years"
  protections: {
    blockAdultDMs: boolean;
    contentFilter: boolean;
    parentalMonitoring: boolean;
    safeMatchmaking: boolean;
  };
  message: string;
}
```

### ThreatReportResult
```typescript
{
  success: boolean;
  reportId: string;
  isCritical: boolean; // true if threatLevel >= 7
  actions: {
    addedToBlacklist: boolean;
    parentsNotified: boolean;
    authoritiesNotified: boolean; // true if threatLevel >= 9
    crossPlatformBlock: boolean;
  };
  message: string;
}
```

---

## 🧪 Testing
```bash
# Run tests
yarn test

# Run with coverage
yarn test --coverage
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🤝 Support

- 📖 **Documentation:** https://docs.kidshield.io
- 💬 **Discord:** https://discord.gg/kidshield
- 📧 **Email:** support@kidshield.io
- 🐛 **Issues:** https://github.com/danialvesdrep/kidshield-midnight/issues

---

## 🌟 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

---

**Built with ❤️ on Midnight Network**
