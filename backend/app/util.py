def to_json(row):
    return dict((col, getattr(row, col)) for col in row.__table__.columns.keys())

def to_response(array):
    return {
        "results": array
    }