interface ReceiptDetailProps {
  title: string;
  value: string | number | undefined | null;
}

const ReceiptDetail = ({ title, value }: ReceiptDetailProps) => {
  return (
    <div className="flex justify-between">
      <span>{title}:</span>
      <span className="text-right">{value}</span>
    </div>
  );
};

export default ReceiptDetail;
