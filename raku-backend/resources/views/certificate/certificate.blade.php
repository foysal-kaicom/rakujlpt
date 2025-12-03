<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Certificate of Achievement</title>

    <style>
        @page {
            size: A4 landscape; /* Wider than A4 */
            margin: 0;
        }

        html, body {
            margin: 0;
            padding: 0;
            background: #fff;
            font-family: sans-serif;
            color: #000;
        }

        .certificate {
            width: 220mm;          /* safe zone inside A4 width */
            height: 105mm;         /* fits within 210mm height */
            margin-top:50px;
            margin-left:85px;
            padding: 20mm 15mm;
            border: 6px solid #7b3cff;
            border-radius: 18px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }

        .certificate::before {
            content: "";
            position: absolute;
            top: 6mm;
            left: 6mm;
            right: 6mm;
            bottom: 6mm;
            border: 1.4px solid #c9a8ff;
            border-radius: 10px;
        }

        .watermark {
            position: absolute;
            top: 52%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-20deg);
            font-size: 75pt;
            color: rgba(123, 60, 255, 0.06);
            font-weight: 700;
            white-space: nowrap;
            z-index: 0;
        }

        .title {
            text-align: center;
            color: #5e2ce0;
            font-size: 26pt;
            font-weight: 700;
            margin-bottom: 4mm;
            z-index: 2;
            position: relative;
        }

        .subtitle {
            text-align: center;
            font-style: italic;
            color: #777;
            font-size: 11pt;
            margin-bottom: 10mm;
            z-index: 2;
            position: relative;
        }

        .name {
            text-align: center;
            font-size: 23pt;
            font-weight: 700;
            color: #5e2ce0;
            margin-bottom: 4mm;
            z-index: 2;
            position: relative;
        }

        .details {
            text-align: center;
            font-size: 12pt;
            color: #555;
            line-height: 1.5;
            z-index: 2;
            position: relative;
        }

        .details strong {
            color: #5e2ce0;
        }

        .footer-table {
            width: 100%;
            margin-top: 18mm;
            border-collapse: collapse;
            z-index: 2;
            position: relative;
        }

        .footer-table td {
            width: 33%;
            text-align: center;
            vertical-align: bottom;
        }

        .line {
            width: 65%;
            height: 1px;
            background: #7b3cff;
            margin: 0 auto 2mm;
        }

        .label {
            font-style: italic;
            color: #7b3cff;
            font-size: 10pt;
        }

        .qr img {
            width: 27mm;
            height: 27mm;
        }

        .verify {
            text-align: center;
            color: #777;
            font-size: 9pt;
            margin-top: 2mm;
        }
    </style>
</head>
<body>

<div class="certificate">
    <div class="watermark">RAKU JLPT</div>

    <div class="title">Certificate of Achievement</div>
    <div class="subtitle">This certificate is proudly presented to</div>

    <div class="name">{{ $name }}</div>

    <div class="details">
        For completing the <strong>{{ $examName }}</strong><br>
        Score: <strong>{{ $score }} / {{ $totalPoint }} </strong><br>
        {{ $date }}
    </div>

    <table class="footer-table">
        <tr>
            <td>
                <div class="line"></div>
                <div>fdhn</div>
                <div class="label">Instructor</div>
            </td>

            <td class="qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={{ urlencode($verifyUrl) }}" alt="QR Code">
                <div class="verify">Scan to Verify</div>
            </td>

            <td>
                <div class="line"></div>
                <div>fdhs</div>
                <div class="label">Administrator</div>
            </td>
        </tr>
    </table>
</div>

</body>
</html>
