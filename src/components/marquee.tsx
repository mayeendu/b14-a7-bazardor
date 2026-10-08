const Marquee = async () => {
  "use cache";
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const productData = data.nameBn;
  console.log(data);

  console.log(productData);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Marquee;
