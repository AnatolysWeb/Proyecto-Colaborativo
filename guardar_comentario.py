from flask import Flask, request, jsonify

app = Flask(__name__)
archivo_comentarios = "comentarios.txt"

@app.route("/guardar_comentario", methods=["POST"])
def guardar_comentario():
    data = request.json
    nombre = data.get("nombre", "").strip()
    comentario = data.get("comentario", "").strip()

    if not nombre or not comentario:
        return jsonify({"error": "Faltan datos"}), 400

    linea = f"{nombre}: {comentario}\n"

    try:
        with open(archivo_comentarios, "a", encoding="utf-8") as file:
            file.write(linea)
        return jsonify({"mensaje": "Comentario guardado"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/obtener_comentarios", methods=["GET"])
def obtener_comentarios():
    try:
        with open(archivo_comentarios, "r", encoding="utf-8") as file:
            comentarios = file.readlines()
        return jsonify({"comentarios": comentarios}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
