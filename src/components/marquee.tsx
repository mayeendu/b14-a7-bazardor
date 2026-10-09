import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Product = {
  id: number;
  nameBn: string;
  today: number;
  yesterday: number;
  categoryIcon: ImageBitmap;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  console.log(data);

  return (
    <div className="w-full overflow-hidden bg-white text-black mt-1 mb-1 border-b-1 border-gray-200">
      <MarqueeText direction="right" duration={30} pauseOnHover={true}>
        <div className="flex w-max flex-nowrap items-center gap-8 whitespace-nowrap py-3">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex shrink-0 flex-nowrap items-center gap-2"
            >
              <span> {product.categoryIcon} </span>
              <span>{product.nameBn}</span>

              <span className="font-bold">
                ৳{product.today}/{product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
              </span>

              <div className="w-[1px] bg-gray-200 self-stretch" />
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
