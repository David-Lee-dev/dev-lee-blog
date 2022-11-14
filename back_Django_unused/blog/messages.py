#check password
CP001 = {'code': 'CP001', 'status': True, 'message': '패스워드가 불일치합니다.'}

# Create Article
CA000 = {'code': 'CA000', 'status': True, 'message': '포스트가 작성되었습니다.'}
CA001 = {'code': 'CA001', 'status': False, 'message': '같은 제목 포스트 또는 같은 이름의 파일이 존재합니다.'}
CA002 = {'code': 'CA002', 'status': False, 'message': '본문 파일이 존재하지 않습니다.'}
CA003 = {'code': 'CA003', 'status': False, 'message': '빈 필드가 존재합니다.'}

# Delete Article
DA000 = {'code': 'DA000', 'status': True, 'message': '포스트가 삭제되었습니다.'}
DA001 = {'code': 'DA001', 'status': False, 'message': '본문 파일이 없어 포스트를 삭제할 수 없습니다.'}
DA002 = {'code': 'DA002', 'status': False, 'message': '존재하지 않는 포스트입니다.'}
DA003 = {'code': 'DA003', 'status': False, 'message': '권한이 없습니다'}

# Get Article
GA000 = {'code': 'GA000', 'status': True, 'message': '포스트(리스트)를 불러왔습니다.'}
GA001 = {'code': 'GA001', 'status': True, 'message': '존재하지 않는 카테고리입니다.'}
GA002 = {'code': 'GA002', 'status': True, 'message': '존재하지 않는 포스트(리스트)입니다.'}

# Create Note
CN000 = {'code': 'CN000', 'status': True, 'message': '노트가 작성되었습니다.'}
CN001 = {'code': 'CN001', 'status': False, 'message': '같은 제목 노트 또는 같은 이름의 파일이 존재합니다.'}
CN002 = {'code': 'CN002', 'status': False, 'message': '본문 파일이 존재하지 않습니다.'}
CN003 = {'code': 'CN003', 'status': False, 'message': '빈 필드가 존재합니다.'}

# Delete Note
DN000 = {'code': 'DN000', 'status': True, 'message': '노트가 삭제되었습니다.'}
DN001 = {'code': 'DN001', 'status': False, 'message': '본문 파일이 없어 노트를 삭제할 수 없습니다.'}
DN002 = {'code': 'DN002', 'status': False, 'message': '존재하지 않는 노트입니다.'}

# Get Note
GN000 = {'code': 'GN000', 'status': True, 'message': '노트(리스트)를 불러왔습니다.'}
GN001 = {'code': 'GN001', 'status': True, 'message': '존재하지 않는 카테고리입니다.'}
GN002 = {'code': 'GN002', 'status': True, 'message': '존재하지 않는 노트(리스트)입니다.'}

# Get Category
GC000 = {'code': 'GC000', 'status': True, 'message': '카테고리 리스트를 불러왔습니다.'}