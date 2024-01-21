async function main() {
  // あなたのコレクションの Base Token URI（JSON の CID）に差し替えてください
  const baseTokenURI = "ipfs://QmdqhEWp7jsQjLi3jA4t6LHC8uGFd93gJMctUyjxuhvAnD/";

  // オーナー/デプロイヤーのウォレットアドレスを取得する
  const [owner] = await hre.ethers.getSigners();

  // デプロイしたいコントラクトを取得
  const contractFactory = await hre.ethers.getContractFactory("NFTCollectible");

  // 正しいコンストラクタ引数（baseTokenURI）でコントラクトをデプロイします。
  const contract = await contractFactory.deploy(baseTokenURI);

  // このトランザクションがマイナーに承認（mine）されるのを待つ
  await contract.deployed();

  // コントラクトアドレスをターミナルに出力
  console.log("Contract deployed to:", contract.address);

  // NFTを 10 点、コントラクト所有者のためにキープする
  let txn = await contract.reserveNFTs();
  await txn.wait();
  console.log("10 NFTs have been reserved");

  // 0.03 ETH を送信して3つ NFT を mint する
  txn = await contract.mintNFTs(3, {
    value: hre.ethers.utils.parseEther("0.03"),
  });
  await txn.wait();

  // コントラクト所有者の保有するtokenIdsを取得
  let tokens = await contract.tokensOfOwner(owner.address);
  console.log("Owner has tokens: ", tokens);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
