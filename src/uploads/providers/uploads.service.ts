import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { UploadFile } from '../interfaces/upload-file.interface';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    if (
      ![
        'images/gif',
        'images/jpeg',
        'images/jpg',
        'images/png',
        'images/webp',
      ].includes(file.mimetype)
    ) {
      throw new BadRequestException('MIME type not allowed.');
    }

    try {
      const filename = await this.uploadToAwsProvider.fileUpload(file);

      const uploadFile: UploadFile = {
        name: filename,
        path: `https://${this.configService.get<string>('appConfig.awsCloudFrontURL')}/${filename}`,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
